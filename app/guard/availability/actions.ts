"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { ActionResult, createErrorMessage } from "@/lib/action-result";
import prisma from "@/lib/prisma";
import { getSessionWithRole } from "@/lib/session";
import {
  CreateAvailabilitySchema,
  CreateWeeklyNoteSchema,
  DeleteAvailabilitySchema,
  DeleteWeeklyNoteSchema,
} from "@/lib/validators/availability";
import { revalidatePath } from "next/cache";

export async function createAvailability(data: unknown): Promise<ActionResult> {
  const session = await getSessionWithRole("GUARD");
  if (!session) {
    return { success: false, error: "אין לך הרשאה להגיש משמרות" };
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
        shiftNote: result.data.shiftNote || null,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { success: false, error: "כבר הגשת זמינות למשמרת זו" };
    }
    console.error(error);
    return { success: false, error: "הוספת המשמרת נכשלה" };
  }

  revalidatePath("/guard/availability");
  return { success: true };
}

export async function deleteAvailability(data: unknown): Promise<ActionResult> {
  const session = await getSessionWithRole("GUARD");
  if (!session) {
    return { success: false, error: "אינך רשאי למחוק זמינות זו" };
  }

  const result = DeleteAvailabilitySchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await prisma.availability.delete({
      where: { id: result.data.id, userId: session.user.id },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "אינך רשאי למחוק זמינות זו",
    };
  }

  revalidatePath("/guard/availability");
  return { success: true };
}

export async function createWeeklyNote(data: unknown): Promise<ActionResult> {
  const session = await getSessionWithRole("GUARD");
  if (!session) {
    return { success: false, error: "אינך רשאי להוסיף הערות" };
  }

  const result = CreateWeeklyNoteSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await prisma.guardWeeklyNote.create({
      data: { content: result.data.content, userId: session.user.id },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "אינך רשאי להוסיף הערות",
    };
  }

  revalidatePath("/guard/availability");
  return { success: true };
}

export async function deleteWeeklyNote(data: unknown): Promise<ActionResult> {
  const session = await getSessionWithRole("GUARD");
  if (!session) {
    return { success: false, error: "אינך רשאי למחוק הערות" };
  }

  const result = DeleteWeeklyNoteSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await prisma.guardWeeklyNote.delete({
      where: { id: result.data.id, userId: session.user.id },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "אינך רשאי למחוק הערות",
    };
  }

  revalidatePath("/guard/availability");
  return { success: true };
}
