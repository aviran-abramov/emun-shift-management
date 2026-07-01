import type { UserRole } from "@/app/generated/prisma/enums";

export const DEFAULT_PATHS: Record<UserRole, string> = {
  GUARD: "/guard/availability",
  MANAGER: "/admin/schedule",
};
