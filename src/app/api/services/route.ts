import { Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/validations/resources";

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "asc" } });
  return ok(services);
}

export async function POST(request: NextRequest) {
  try {
    await requireRole(request, [Role.ADMIN]);
    const input = serviceSchema.parse(await request.json());
    const service = await prisma.service.create({ data: input });
    return ok(service, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") return fail("Forbidden", 403);
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}
