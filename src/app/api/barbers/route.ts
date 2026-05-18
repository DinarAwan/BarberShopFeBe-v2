import { Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { barberSchema } from "@/validations/resources";

export async function GET() {
  const barbers = await prisma.barber.findMany({ orderBy: { createdAt: "asc" } });
  return ok(barbers);
}

export async function POST(request: NextRequest) {
  try {
    await requireRole(request, [Role.ADMIN]);
    const input = barberSchema.parse(await request.json());
    const barber = await prisma.barber.create({ data: input });
    return ok(barber, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") return fail("Forbidden", 403);
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}
