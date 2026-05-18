import { jwtVerify, SignJWT } from "jose";
import type { Role } from "@prisma/client";
import { env } from "./env";

export type TokenPayload = {
  sub: string;
  email: string;
  name: string;
  role: Role;
};

const accessSecret = new TextEncoder().encode(env.accessSecret);
const sessionSecret = new TextEncoder().encode(env.sessionSecret);

export async function signAccessToken(payload: TokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(accessSecret);
}

export async function signSessionToken(payload: TokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(sessionSecret);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, accessSecret);
  return payload as TokenPayload;
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, sessionSecret);
  return payload as TokenPayload;
}
