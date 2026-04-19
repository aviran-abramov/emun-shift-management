import { Metadata } from "next";
import { columns, Guard } from "./columns";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { CreateGuardDialog } from "@/app/admin/guards/_components/create-guard-dialog";

export const metadata: Metadata = { title: "שומרים" };

async function getGuards(): Promise<Guard[]> {
  return await prisma.user.findMany({
    select: {
      id: true,
      isActive: true,
      firstName: true,
      lastName: true,
      username: true,
      createdAt: true,
    },
  });
}

export default async function GuardsPage() {
  const guards = await getGuards();

  return (
    <PageContainer>
      <section className="flex flex-col gap-3">
        <PageTitle title="רשימת שומרים" count={guards.length} />
        <CreateGuardDialog />
        <DataTable
          columns={columns}
          data={guards}
          filter={{ column: "firstName", placeholder: "סנן לפי שם השומר" }}
        />
      </section>
    </PageContainer>
  );
}
