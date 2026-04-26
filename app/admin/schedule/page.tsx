import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "סידורי עבודה" };

export default async function AdminSchedulePage() {
  const building = await prisma.building.findUnique({
    where: { id: "1" },
  });
  if (!building) notFound();

  const guards = await prisma.user.findMany({
    where: {
      role: "GUARD",
      buildings: { some: { id: building.id } },
    },
    include: { availabilities: true },
  });

  const submitted = guards.filter((guard) => guard.availabilities.length > 0);
  const notSubmittedYet = guards.filter(
    (guard) => guard.availabilities.length === 0,
  );

  return (
    <PageContainer className="max-w-md">
      <div className="flex flex-col gap-4">
        <PageTitle title="סידורי עבודה" />
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
            <h2 className="text-2xl font-bold">סטטוס הגשת זמינות</h2>
            <h3 className="text-xl font-semibold">{building.name}</h3>

            <div className="flex flex-col">
              <h4 className="text-lg font-bold">הגישו</h4>
              {submitted.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {submitted.map((guard) => (
                    <li
                      key={guard.id}
                      className="px-2 py-1 rounded self-start bg-green-300"
                    >
                      {guard.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  אף אחד לא הגיש עדיין משמרות
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <h4 className="text-lg font-bold">עדיין לא הגישו</h4>
              {notSubmittedYet.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {notSubmittedYet.map((guard) => (
                    <li
                      key={guard.id}
                      className="px-2 py-1 rounded self-start bg-red-300"
                    >
                      {guard.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">כולם הגישו משמרות</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
