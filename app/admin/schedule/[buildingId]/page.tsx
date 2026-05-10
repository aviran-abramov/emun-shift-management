import { ScheduleDesktop } from "@/app/admin/schedule/[buildingId]/_components/schedule-desktop";
import { ScheduleMobile } from "@/app/admin/schedule/[buildingId]/_components/schedule-mobile";
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
  });
  if (!building) notFound();

  const availabilities = await prisma.availability.findMany({
    where: { user: { buildings: { some: { id: buildingId } } } },
    include: { user: true },
  });

  const guardScheduleNotes = await prisma.guardScheduleNote.findMany({
    include: { user: true },
  });

  return (
    <PageContainer className="max-w-full flex flex-col gap-4">
      <PageTitle title={building.name} />

      <div className="hidden lg:block">
        <ScheduleDesktop
          availabilities={availabilities}
          generalNotes={guardScheduleNotes}
        />
      </div>

      <div className="lg:hidden">
        <ScheduleMobile
          availabilities={availabilities}
          generalNotes={guardScheduleNotes}
        />
      </div>
    </PageContainer>
  );
}
