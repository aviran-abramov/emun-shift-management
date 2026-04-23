import type { Role } from "@/app/generated/prisma/enums";

export const DEFAULT_PATHS: Record<Role, string> = {
  GUARD: "/guard/dashboard",
  MANAGER: "/admin/dashboard",
};
