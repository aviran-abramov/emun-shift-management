"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";
import { ActionResult, createErrorMessage } from "@/lib/action-result";
import prisma from "@/lib/prisma";
import { CreateBuildingSchema } from "@/lib/validators/building";
import { revalidatePath } from "next/cache";

type ShiftSlotConfigInput = Prisma.BuildingShiftSlotConfigCreateManyInput;

export async function createBuilding(data: unknown): Promise<ActionResult> {
  const result = CreateBuildingSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const building = await tx.building.create({ data: result.data });

      const days = Object.values(DayOfWeek);
      const shiftTypes = Object.values(ShiftType);

      const shiftSlotConfigs: ShiftSlotConfigInput[] = days.flatMap(
        (dayOfWeek) =>
          shiftTypes.map((shiftType) => ({
            buildingId: building.id,
            dayOfWeek,
            shiftType,
          })),
      );

      await tx.buildingShiftSlotConfig.createMany({ data: shiftSlotConfigs });
    });
  } catch (error) {
    console.error(error);
    return { success: false, error: "הוספת הבניין נכשלה" };
  }

  revalidatePath("/admin/buildings");
  return {
    success: true,
  };
}
