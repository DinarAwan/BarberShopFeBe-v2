import { BookingStatus, Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bookingStatusSchema } from "@/validations/booking";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: Context) {
  try {
    const auth = await requireAuth(request);
    const { id } = await context.params;
    const input = bookingStatusSchema.parse(await request.json());
    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) return fail("Booking tidak ditemukan", 404);
    if (auth.role === Role.USER && booking.userId !== auth.sub) return fail("Forbidden", 403);
    if (auth.role === Role.USER && input.status !== BookingStatus.CANCELED) {
      return fail("User hanya dapat membatalkan booking", 403);
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: input.status, notes: input.notes ?? booking.notes },
      include: {
        user: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
        service: true,
        barber: true,
      },
    });

    return ok(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const auth = await requireAuth(request);
    const { id } = await context.params;
    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) return fail("Booking tidak ditemukan", 404);
    if (auth.role === Role.USER && booking.userId !== auth.sub) return fail("Forbidden", 403);

    if (auth.role === Role.USER) {
      const canceled = await prisma.booking.update({
        where: { id },
        data: { status: BookingStatus.CANCELED },
      });
      return ok(canceled);
    }

    await prisma.booking.delete({ where: { id } });
    return ok({ id });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}
