import type { NextRequest } from "next/server";
import { BookingStatus } from "@prisma/client";
import { fail, ok } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { normalizeDate } from "@/lib/utils";
import { BOOKING_SLOTS } from "@/utils/booking";

export async function GET(request: NextRequest) {
  const barberId = request.nextUrl.searchParams.get("barberId");
  const date = request.nextUrl.searchParams.get("date");

  if (!barberId || !date) {
    return fail("barberId and date are required", 422);
  }

  const bookings = await prisma.booking.findMany({
    where: {
      barberId,
      bookingDate: normalizeDate(date),
      status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.ONGOING] },
    },
    select: { bookingTime: true },
  });

  const taken = bookings.map((booking) => booking.bookingTime);
  return ok({
    slots: BOOKING_SLOTS.map((time) => ({
      time,
      available: !taken.includes(time),
    })),
  });
}
