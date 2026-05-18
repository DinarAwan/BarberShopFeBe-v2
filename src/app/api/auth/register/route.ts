import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { signAccessToken, signSessionToken } from "@/lib/jwt";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/cookies";
import { fail, handleApiError, ok } from "@/lib/api-response";
import { isRateLimited } from "@/lib/rate-limit";
import { toSafeUser } from "@/lib/serializers";
import { registerSchema } from "@/validations/auth";

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request, 8)) {
      return fail("Too many register attempts. Please try again later.", 429);
    }

    const input = registerSchema.parse(await request.json());
    const exists = await prisma.user.findUnique({ where: { email: input.email } });

    if (exists) {
      return fail("Email sudah terdaftar", 409);
    }

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await hashPassword(input.password),
      },
    });

    const safeUser = toSafeUser(user);
    const payload = { sub: user.id, id: user.id, email: user.email, name: user.name, role: user.role };
    const accessToken = await signAccessToken(payload);
    const sessionToken = await signSessionToken(payload);
    const response = ok({ user: safeUser, accessToken }, 201);
    response.cookies.set(SESSION_COOKIE, sessionToken, sessionCookieOptions);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
