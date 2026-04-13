import { Metadata } from "next";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import { Building } from "@/app/generated/prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { CreateBuildingDialog } from "@/components/buildings/create-building-dialog";

export const metadata: Metadata = { title: "בניינים" };

async function getBuildings(): Promise<Building[]> {
  return await prisma.building.findMany();
}

export default async function BuildingsPage() {
  const buildings = await getBuildings();

  return (
    <PageContainer>
      <section className="flex flex-col gap-3">
        <PageTitle title="רשימת בניינים" count={buildings.length} />
        <CreateBuildingDialog />
        <DataTable columns={columns} data={buildings} />
      </section>
    </PageContainer>
  );
}
