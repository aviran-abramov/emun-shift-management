import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { SectionTitle } from "@/components/layout/section-title";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "סידורי עבודה" };

export default async function AdminSchedulePage() {
  const buildings = await prisma.building.findMany({
    where: { isActive: true },
  });
  if (!buildings) notFound();

  return (
    <PageContainer className="max-w-2xl">
      <div className="flex flex-col gap-4">
        <PageTitle title="סידורי עבודה" />
        <div className="flex flex-col gap-4">
          <SectionTitle className="font-semibold">
            רשימת בניינים ({buildings.length})
          </SectionTitle>
          <ul>
            {buildings.map((building) => (
              <li key={building.id}>
                <Link
                  href={`/admin/schedule/${building.id}`}
                  className="text-blue-500 hover:underline text-xl font-semibold"
                >
                  {building.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
