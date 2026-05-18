import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signAccessToken, signSessionToken } from "@/lib/jwt";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/cookies";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { isRateLimited } from "@/lib/rate-limit";
import { toSafeUser } from "@/lib/serializers";
import { loginSchema } from "@/validations/auth";

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request, 10)) {
      return fail("Too many login attempts. Please try again later.", 429);
    }

    const input = loginSchema.parse(await request.json());
    const user = await prisma.user.findUnique({ where: { email: input.email } });

    if (!user || !(await verifyPassword(input.password, user.password))) {
      return fail("Email atau password salah", 401);
    }

    const safeUser = toSafeUser(user);
    const payload = { sub: user.id, id: user.id, email: user.email, name: user.name, role: user.role };
    const accessToken = await signAccessToken(payload);
    const sessionToken = await signSessionToken(payload);
    const response = ok({ user: safeUser, accessToken });
    response.cookies.set(SESSION_COOKIE, sessionToken, sessionCookieOptions);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
