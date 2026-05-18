import { BookingStatus, Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await requireRole(request, [Role.ADMIN]);

    const [users, services, barbers, totalBookings, pendingBookings, doneBookings, recentBookings] =
      await Promise.all([
        prisma.user.count({ where: { role: Role.USER } }),
        prisma.service.count(),
        prisma.barber.count(),
        prisma.booking.count(),
        prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
        prisma.booking.count({ where: { status: BookingStatus.DONE } }),
        prisma.booking.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          include: {
            user: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
            service: true,
            barber: true,
          },
        }),
      ]);

    return ok({
      cards: {
        users,
        services,
        barbers,
        totalBookings,
        pendingBookings,
        doneBookings,
      },
      chart: [
        { label: "Pending", value: pendingBookings },
        { label: "Done", value: doneBookings },
        { label: "All", value: totalBookings },
      ],
      recentBookings,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") return fail("Forbidden", 403);
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}
