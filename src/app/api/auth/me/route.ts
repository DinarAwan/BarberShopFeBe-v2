import type { NextRequest } from "next/server";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSafeUser } from "@/lib/serializers";
import { profileSchema } from "@/validations/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request);

    if (!auth) {
      return fail("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({ where: { id: auth.sub } });
    return user ? ok(toSafeUser(user)) : fail("Unauthorized", 401);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getAuthUser(request);

    if (!auth) {
      return fail("Unauthorized", 401);
    }

    const input = profileSchema.parse(await request.json());
    const user = await prisma.user.update({
      where: { id: auth.sub },
      data: { name: input.name },
    });

    return ok(toSafeUser(user));
  } catch (error) {
    return handleApiError(error);
  }
}
