import AddBuildingForm from "@/app/admin/guards/[guardId]/buildings/_components/add-building-form";
import { RemoveBuildingButton } from "@/app/admin/guards/[guardId]/buildings/_components/remove-building-button";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { SectionTitle } from "@/components/layout/section-title";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminGuardBuildings({
  params,
}: {
  params: Promise<{ guardId: string }>;
}) {
  const { guardId } = await params;
  const guard = await prisma.user.findUnique({
    where: { id: guardId },
    include: { buildings: true },
  });
  if (!guard) notFound();

  const buildings = await prisma.building.findMany({});

  return (
    <PageContainer>
      <PageTitle
        title={`בניינים - ${guard.name}`}
        count={guard.buildings.length}
      />

      <section>
        <SectionTitle>הוסף בניין</SectionTitle>
        <AddBuildingForm guardId={guardId} buildings={buildings} />
      </section>

      <section className="flex flex-col gap-1">
        <SectionTitle>רשימת בניינים</SectionTitle>
        {guard.buildings.length > 0 ? (
          <ul>
            {guard.buildings.map((building) => (
              <li key={building.id} className="flex items-center gap-2">
                <span className="font-medium">- {building.name}</span>
                <div className="flex items-center gap-1">
                  <Button asChild>
                    <Link href={`/admin/buildings/${building.id}/schedule`}>
                      הצג
                    </Link>
                  </Button>
                  <RemoveBuildingButton
                    buildingId={building.id}
                    guardId={guard.id}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">אין בניינים פעילים לעובד זה</p>
        )}
      </section>
    </PageContainer>
  );
}
