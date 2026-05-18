import type { NextRequest } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/cookies";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { signAccessToken, signSessionToken, verifySessionToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { toSafeUser } from "@/lib/serializers";

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get(SESSION_COOKIE)?.value;

    if (!session) {
      return fail("Unauthorized", 401);
    }

    const payload = await verifySessionToken(session);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user) {
      return fail("Unauthorized", 401);
    }

    const nextPayload = { sub: user.id, id: user.id, email: user.email, name: user.name, role: user.role };
    const accessToken = await signAccessToken(nextPayload);
    const sessionToken = await signSessionToken(nextPayload);
    const response = ok({ user: toSafeUser(user), accessToken });
    response.cookies.set(SESSION_COOKIE, sessionToken, sessionCookieOptions);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
