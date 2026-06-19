"use server";

import { UserRole } from "@/app/generated/prisma/enums";
import { ActionResult, createErrorMessage } from "@/lib/action-result";
import { createBuildingWithSlots } from "@/lib/buildings/create-building-with-slots";
import { getSessionForRole } from "@/lib/session";
import { CreateBuildingSchema } from "@/lib/validators/building";
import { revalidatePath } from "next/cache";

export async function createBuilding(data: unknown): Promise<ActionResult> {
  const session = await getSessionForRole(UserRole.MANAGER);
  if (!session) {
    return { success: false, error: "אינך רשאי להוסיף בניין" };
  }

  const result = CreateBuildingSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await createBuildingWithSlots(result.data);
  } catch (error) {
    console.error(error);
    return { success: false, error: "הוספת הבניין נכשלה" };
  }

  revalidatePath("/admin/buildings");
  return {
    success: true,
  };
}
