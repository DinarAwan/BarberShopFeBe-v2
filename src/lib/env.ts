const fallbackSecret = "development-secret-change-me-32-characters";

export const env = {
  databaseUrl: process.env.DATABASE_URL,
  accessSecret: process.env.JWT_ACCESS_SECRET ?? fallbackSecret,
  sessionSecret: process.env.JWT_SESSION_SECRET ?? fallbackSecret,
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  isProduction: process.env.NODE_ENV === "production",
};
