import type { Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "./cookies";
import { verifyAccessToken, verifySessionToken, type TokenPayload } from "./jwt";

export async function getAuthUser(request: NextRequest): Promise<TokenPayload | null> {
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  try {
    if (bearer) {
      return await verifyAccessToken(bearer);
    }

    const session = request.cookies.get(SESSION_COOKIE)?.value;
    return session ? await verifySessionToken(session) : null;
  } catch {
    return null;
  }
}

export async function requireAuth(request: NextRequest) {
  const user = await getAuthUser(request);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireRole(request: NextRequest, roles: Role[]) {
  const user = await requireAuth(request);

  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}
