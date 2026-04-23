"use server";

import { ActionResult, createErrorMessage } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import { DEFAULT_PATHS } from "@/lib/paths";
import prisma from "@/lib/prisma";
import { SignInSchema } from "@/lib/validators/auth";
import { redirect } from "next/navigation";

export async function signIn(data: unknown): Promise<ActionResult> {
  const result = SignInSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await auth.api.signInUsername({
      body: {
        username: result.data.username,
        password: result.data.password,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "ההתחברות נכשלה. אנא נסה שנית.",
    };
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { username: result.data.username },
      select: { role: true },
    });
  } catch (error) {
    return {
      success: false,
      error: "ההתחברות נכשלה. אנא נסה שנית.",
    };
  }

  if (!user) {
    return {
      success: false,
      error: "ההתחברות נכשלה. אנא נסה שנית.",
    };
  }

  redirect(DEFAULT_PATHS[user.role]);
}
