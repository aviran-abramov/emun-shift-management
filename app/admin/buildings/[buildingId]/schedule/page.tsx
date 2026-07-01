import { ScheduleDesktop } from "@/app/admin/buildings/[buildingId]/schedule/_components/schedule-desktop";
import { ScheduleMobile } from "@/app/admin/buildings/[buildingId]/schedule/_components/schedule-mobile";
import { ScheduleStats } from "@/app/admin/buildings/[buildingId]/schedule/_components/schedule-stats";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AdminBuildingSchedulePage({
  params,
}: {
  params: Promise<{ buildingId: string }>;
}) {
  const { buildingId } = await params;
  const building = await prisma.building.findUnique({
    where: { id: buildingId },
    include: { shiftSlotConfigs: true },
  });
  if (!building) notFound();

  const [availabilities, weeklyNotes, activeGuards] = await Promise.all([
    prisma.availability.findMany({
      where: { user: { buildings: { some: { id: buildingId } } } },
      include: { user: true },
    }),
    prisma.guardWeeklyNote.findMany({
      where: { user: { buildings: { some: { id: buildingId } } } },
      include: { user: true },
    }),
    prisma.user.findMany({
      where: {
        role: "GUARD",
        isActive: true,
        buildings: { some: { id: buildingId } },
      },
      select: { id: true, name: true },
    }),
  ]);

  const notSubmittedGuards = activeGuards.filter(
    (g) => !availabilities.some((a) => a.userId === g.id),
  );

  const emptyShiftsCount = building.shiftSlotConfigs.filter(
    (slot) =>
      slot.isEnabled &&
      !availabilities.some(
        (a) => a.dayOfWeek === slot.dayOfWeek && a.shiftType === slot.shiftType,
      ),
  ).length;

  return (
    <PageContainer className="max-w-full flex flex-col gap-4">
      <PageTitle title={building.name} />

      <ScheduleStats
        activeGuardsCount={activeGuards.length}
        emptyShiftsCount={emptyShiftsCount}
        notSubmittedGuardsCount={notSubmittedGuards.length}
        weeklyNotesCount={weeklyNotes.length}
      />

      <div className="hidden lg:block">
        <ScheduleDesktop
          availabilities={availabilities}
          weeklyNotes={weeklyNotes}
          shiftSlotConfigs={building.shiftSlotConfigs}
        />
      </div>

      <div className="lg:hidden">
        <ScheduleMobile
          availabilities={availabilities}
          weeklyNotes={weeklyNotes}
          shiftSlotConfigs={building.shiftSlotConfigs}
        />
      </div>
    </PageContainer>
  );
}
