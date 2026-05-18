"use client";

import type { Role } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  setSession: (accessToken: string, user: AuthUser) => void;
  setAccessToken: (accessToken: string | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: (accessToken, user) => set({ accessToken, user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearSession: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "barbershop-auth",
      partialize: (state) => ({ accessToken: state.accessToken, user: state.user }),
    },
  ),
);
