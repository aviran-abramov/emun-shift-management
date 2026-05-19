import EditBuildingShiftConfigForm from "@/app/admin/buildings/[buildingId]/config/_components/edit-building-shift-config-form";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import SectionCard from "@/components/shared/section-card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AdminBuildingConfigPage({
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

  return (
    <PageContainer>
      <PageTitle title={`הגדרת משמרות - ${building.name}`} />

      <SectionCard>
        <EditBuildingShiftConfigForm building={building} />
      </SectionCard>
    </PageContainer>
  );
}
