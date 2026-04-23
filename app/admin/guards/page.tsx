import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { CreateGuardDialog } from "@/app/admin/guards/_components/create-guard-dialog";
import { getGuards } from "@/app/admin/guards/actions";

export const metadata: Metadata = { title: "שומרים" };

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
