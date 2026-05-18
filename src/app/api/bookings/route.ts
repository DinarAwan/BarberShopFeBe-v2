import { BookingStatus, Prisma, Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeDate } from "@/lib/utils";
import { bookingSchema } from "@/validations/booking";
import { isValidBookingSlot } from "@/utils/booking";

const activeStatuses = [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.ONGOING];

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
    const q = request.nextUrl.searchParams.get("q") ?? "";
    const status = request.nextUrl.searchParams.get("status") as BookingStatus | null;
    const take = 8;
    const where: Prisma.BookingWhereInput = {
      ...(auth.role === Role.USER ? { userId: auth.sub } : {}),
      ...(status ? { status } : {}),
      ...(q
        ? {
            OR: [
              { user: { name: { contains: q, mode: "insensitive" } } },
              { service: { name: { contains: q, mode: "insensitive" } } },
              { barber: { name: { contains: q, mode: "insensitive" } } },
            ],
          }
        : {}),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
          service: true,
          barber: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (Math.max(page, 1) - 1) * take,
        take,
      }),
      prisma.booking.count({ where }),
    ]);

    return ok({ bookings, pagination: { page, take, total, pages: Math.ceil(total / take) } });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    const input = bookingSchema.parse(await request.json());

    if (!isValidBookingSlot(input.bookingTime)) {
      return fail("Slot booking tidak tersedia", 422);
    }

    const bookingDate = normalizeDate(input.bookingDate);
    const nowDate = normalizeDate(new Date());

    if (bookingDate < nowDate) {
      return fail("Tanggal booking tidak boleh di masa lalu", 422);
    }

    const booking = await prisma.$transaction(
      async (tx) => {
        const [service, barber, conflict] = await Promise.all([
          tx.service.findUnique({ where: { id: input.serviceId } }),
          tx.barber.findUnique({ where: { id: input.barberId } }),
          tx.booking.findFirst({
            where: {
              barberId: input.barberId,
              bookingDate,
              bookingTime: input.bookingTime,
              status: { in: activeStatuses },
            },
          }),
        ]);

        if (!service) throw new Error("Service tidak ditemukan");
        if (!barber) throw new Error("Barber tidak ditemukan");
        if (conflict) throw new Error("Slot ini sudah terisi");

        return tx.booking.create({
          data: {
            userId: auth.sub,
            serviceId: input.serviceId,
            barberId: input.barberId,
            bookingDate,
            bookingTime: input.bookingTime,
            notes: input.notes || null,
            status: BookingStatus.PENDING,
          },
          include: { service: true, barber: true },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    return ok(booking, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}
