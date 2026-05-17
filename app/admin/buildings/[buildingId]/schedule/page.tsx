import { ScheduleDesktop } from "@/app/admin/buildings/[buildingId]/schedule/_components/schedule-desktop";
import { ScheduleMobile } from "@/app/admin/buildings/[buildingId]/schedule/_components/schedule-mobile";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
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
  });
  if (!building) notFound();

  const [availabilities, weeklyNotes, activeGuards] = await Promise.all([
    prisma.availability.findMany({
      where: { user: { buildings: { some: { id: buildingId } } } },
      include: { user: true },
    }),
    prisma.guardWeeklyNote.findMany({
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

  let emptyShiftsCount = 11;
  Object.keys(DAY_LABELS).forEach((day) => {
    Object.keys(SHIFT_LABELS).forEach((shiftType) => {
      if (
        availabilities.some(
          (a) => a.dayOfWeek === day && a.shiftType === shiftType,
        )
      ) {
        emptyShiftsCount--;
      }
    });
  });

  return (
    <PageContainer className="max-w-full flex flex-col gap-4">
      <PageTitle title={building.name} />

      <div className="hidden lg:block">
        <ScheduleDesktop
          activeGuardsCount={activeGuards.length}
          availabilities={availabilities}
          weeklyNotes={weeklyNotes}
          emptyShiftsCount={emptyShiftsCount}
          notSubmittedGuardsCount={notSubmittedGuards.length}
        />
      </div>

      <div className="lg:hidden">
        <ScheduleMobile
          activeGuardsCount={activeGuards.length}
          availabilities={availabilities}
          weeklyNotes={weeklyNotes}
          emptyShiftsCount={emptyShiftsCount}
          notSubmittedGuardsCount={notSubmittedGuards.length}
        />
      </div>
    </PageContainer>
  );
}
