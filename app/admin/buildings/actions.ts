"use server";

import { ActionResult, createErrorMessage } from "@/lib/action-result";
import { createBuildingWithSlots } from "@/lib/buildings/create-building-with-slots";
import { CreateBuildingSchema } from "@/lib/validators/building";
import { revalidatePath } from "next/cache";

export async function createBuilding(data: unknown): Promise<ActionResult> {
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
