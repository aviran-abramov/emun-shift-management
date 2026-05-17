"use server";

import { ActionResult, createErrorMessage } from "@/lib/action-result";
import prisma from "@/lib/prisma";
import { getSessionWithRole } from "@/lib/session";
import {
  AddBuildingSchema,
  RemoveBuildingSchema,
} from "@/lib/validators/guard";
import { revalidatePath } from "next/cache";

export async function addBuilding(data: unknown): Promise<ActionResult> {
  const session = await getSessionWithRole("MANAGER");
  if (!session) {
    return { success: false, error: "אינך רשאי להוסיף בניינים" };
  }

  const result = AddBuildingSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  const { buildingId, guardId } = result.data;

  try {
    await prisma.user.update({
      where: { id: guardId },
      data: { buildings: { connect: { id: buildingId } } },
    });
  } catch (error) {
    console.error(error);
    return { success: false, error: "הוספת הבניין נכשלה" };
  }

  revalidatePath(`/admin/guards/${guardId}/buildings`);
  return { success: true };
}

export async function removeBuilding(data: unknown): Promise<ActionResult> {
  const session = await getSessionWithRole("MANAGER");
  if (!session) {
    return { success: false, error: "אינך רשאי להסיר בניינים" };
  }

  const result = RemoveBuildingSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  const { buildingId, guardId } = result.data;

  try {
    await prisma.user.update({
      where: { id: guardId },
      data: { buildings: { disconnect: { id: buildingId } } },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "אינך רשאי להסיר בניין מעובד זה",
    };
  }

  revalidatePath(`/admin/guards/${guardId}/buildings`);
  return { success: true };
}
