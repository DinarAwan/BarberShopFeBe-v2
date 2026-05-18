export const BOOKING_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "19:00",
  "20:00",
];

export function isValidBookingSlot(time: string) {
  return BOOKING_SLOTS.includes(time);
}
