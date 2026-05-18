import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/cookies";

export async function POST() {
  const response = NextResponse.json({ success: true, data: { message: "Logged out" } });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
