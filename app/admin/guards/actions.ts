"use server";

import { Guard } from "@/app/admin/guards/columns";
import { ActionResult, createErrorMessage } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateGuardSchema } from "@/lib/validators/guard";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getGuards(): Promise<Guard[]> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "MANAGER") {
    redirect("/forbidden");
  }

  return await prisma.user.findMany({
    where: { role: "GUARD" },
    select: {
      id: true,
      isActive: true,
      firstName: true,
      lastName: true,
      username: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createGuard(data: unknown): Promise<ActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "MANAGER") {
    return {
      success: false,
      error: "אין לך הרשאה להוסיף שומר",
    };
  }

  const result = CreateGuardSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  const { firstName, lastName, username, password } = result.data;

  try {
    const signUpResult = await auth.api.signUpEmail({
      body: {
        role: "GUARD",
        email: `${username}@emun.local`,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        username,
        password,
      },
    });

    await prisma.user.update({
      where: { id: signUpResult.user.id },
      data: { buildings: { connect: { id: "1" } } },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      const code = error.body?.code;
      if (code === "USERNAME_IS_ALREADY_TAKEN") {
        return { success: false, error: "שם המשתמש כבר קיים" };
      }
    }

    return { success: false, error: "הוספת השומר נכשלה" };
  }

  revalidatePath("/admin/guards");
  return {
    success: true,
  };
}
