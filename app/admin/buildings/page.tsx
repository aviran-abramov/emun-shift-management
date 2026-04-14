import { Metadata } from "next";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { CreateBuildingDialog } from "@/app/admin/buildings/_components/create-building-dialog";

export const metadata: Metadata = { title: "בניינים" };

export default async function BuildingsPage() {
  const buildings = await prisma.building.findMany();

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
