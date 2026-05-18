import { Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/validations/resources";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: Context) {
  try {
    await requireRole(request, [Role.ADMIN]);
    const { id } = await context.params;
    const input = serviceSchema.partial().parse(await request.json());
    const service = await prisma.service.update({ where: { id }, data: input });
    return ok(service);
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") return fail("Forbidden", 403);
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await requireRole(request, [Role.ADMIN]);
    const { id } = await context.params;
    await prisma.service.delete({ where: { id } });
    return ok({ id });
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") return fail("Forbidden", 403);
    if (error instanceof Error && error.message === "Unauthorized") return fail("Unauthorized", 401);
    return handleApiError(error);
  }
}
