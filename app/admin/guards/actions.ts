"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateGuardSchema } from "@/lib/validators/guard";
import { revalidatePath } from "next/cache";
import * as z from "zod";

type ActionResult = { success: true } | { success: false; error: string };

const createErrorMessage = (issues: z.core.$ZodIssueBase[]): string => {
  let errorMessage = "";

  issues.forEach((issue) => {
    errorMessage += `${issue.path}: ${issue.message}`;
  });

  return errorMessage;
};

export async function createGuard(data: unknown): Promise<ActionResult> {
  const result = CreateGuardSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  const { firstName, lastName, username, password } = result.data;

  try {
    await auth.api.signUpEmail({
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
    // TODO: add building connection (id = "1")
  } catch (error) {
    console.error(error);
    return { success: false, error: "הוספת המאבטח נכשלה" };
  }

  revalidatePath("/admin/guards");
  return {
    success: true,
  };
}
