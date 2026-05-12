import { Prisma } from "@/app/generated/prisma/client";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";

type ShiftSlotConfigInput = Prisma.BuildingShiftSlotConfigCreateManyInput;

export async function createBuildingWithSlots(
  data: Prisma.BuildingCreateInput,
) {
  return prisma.$transaction(async (tx) => {
    const building = await tx.building.create({ data });

    const days = Object.values(DayOfWeek);
    const shiftTypes = Object.values(ShiftType);

    const shiftSlotConfigs: ShiftSlotConfigInput[] = days.flatMap((dayOfWeek) =>
      shiftTypes.map((shiftType) => ({
        buildingId: building.id,
        dayOfWeek,
        shiftType,
      })),
    );

    await tx.buildingShiftSlotConfig.createMany({ data: shiftSlotConfigs });

    return building;
  });
}
