"use server";

import { ActionResult, createErrorMessage } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateAvailabilitySchema } from "@/lib/validators/availability";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createAvailability(data: unknown): Promise<ActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "GUARD") {
    return { success: false, error: "אין לך הרשאה להגיש משמרת" };
  }

  const result = CreateAvailabilitySchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await prisma.availability.create({
      data: {
        userId: session.user.id,
        day: result.data.day,
        shiftType: result.data.shiftType,
        note: result.data.note || null,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "הוספת המשמרת נכשלה",
    };
  }

  revalidatePath("/guard/availability");
  return { success: true };
}
