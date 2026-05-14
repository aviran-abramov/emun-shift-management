"use server";

import { ActionResult, createErrorMessage } from "@/lib/action-result";
import prisma from "@/lib/prisma";
import { getSessionWithRole } from "@/lib/session";
import {
  CreateWeeklyNoteSchema,
  DeleteAvailabilitySchema,
  DeleteWeeklyNoteSchema,
  SaveAvailabilitiesSchema,
} from "@/lib/validators/availability";
import { revalidatePath } from "next/cache";

export async function saveAvailabilities(data: unknown): Promise<ActionResult> {
  const session = await getSessionWithRole("GUARD");
  if (!session) {
    return { success: false, error: "אין לך הרשאה להגיש משמרות" };
  }

  const result = SaveAvailabilitiesSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  const { slots } = result.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.availability.deleteMany({
        where: { userId: session.user.id },
      });

      await tx.availability.createMany({
        data: slots.map((slot) => ({
          userId: session.user.id,
          dayOfWeek: slot.dayOfWeek,
          shiftType: slot.shiftType,
        })),
      });
    });
  } catch (error) {
    console.error(error);
    return { success: false, error: "הוספת המשמרות נכשלה" };
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
