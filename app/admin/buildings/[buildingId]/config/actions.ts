"use server";

import { ActionResult, createErrorMessage } from "@/lib/action-result";
import prisma from "@/lib/prisma";
import { getSessionWithRole } from "@/lib/session";
import { UpdateBuildingShiftConfigSchema } from "@/lib/validators/building";
import { revalidatePath } from "next/cache";

export async function updateBuildingShiftConfig(
  data: unknown,
): Promise<ActionResult> {
  const session = await getSessionWithRole("MANAGER");
  if (!session) {
    return { success: false, error: "אין לך הרשאה לעדכן הגדרות למשמרות" };
  }

  const result = UpdateBuildingShiftConfigSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: createErrorMessage(result.error.issues) };
  }

  const { buildingId, slots } = result.data;

  try {
    await prisma.$transaction(async (tx) => {
      for (const slot of slots) {
        await tx.buildingShiftSlotConfig.updateMany({
          where: { id: slot.id, buildingId },
          data: { isEnabled: slot.isEnabled },
        });
      }
    });
  } catch (error) {
    console.error(error);
    return { success: false, error: "עדכון הגדרות המשמרות נכשל" };
  }

  revalidatePath(`/admin/buildings/${buildingId}/config`);
  return { success: true };
}
