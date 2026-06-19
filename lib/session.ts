import type { Role } from "@/app/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function getSessionForRole(role: Role) {
  const session = await getSession();
  if (!session || session.user.role !== role) return null;

  return session;
}

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  return session;
}

export async function requireRole(role: Role) {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  if (session.user.role !== role) redirect("/forbidden");

  return session;
}
