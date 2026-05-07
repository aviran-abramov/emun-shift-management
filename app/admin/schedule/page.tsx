import { WeeklyAvailabilities } from "@/app/admin/schedule/_components/weekly-availabilities";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { SectionTitle } from "@/components/layout/section-title";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "סידורי עבודה" };

export default async function AdminSchedulePage() {
  const [building, guards, guardsScheduleNotes] = await Promise.all([
    prisma.building.findUnique({ where: { id: "1" } }),
    prisma.user.findMany({
      where: { role: "GUARD", buildings: { some: { id: "1" } } },
      include: { availabilities: true },
    }),
    prisma.guardScheduleNote.findMany({ include: { user: true } }),
  ]);
  if (!building) notFound();

  const notSubmittedYet = guards.filter(
    (guard) => guard.availabilities.length === 0,
  );

  return (
    <PageContainer className="max-w-2xl">
      <div className="flex flex-col gap-4">
        <PageTitle title="סידורי עבודה" />
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
            <SectionTitle>{building.name}</SectionTitle>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">
                עדיין לא הגישו ({notSubmittedYet.length})
              </h3>
              {notSubmittedYet.length > 0 ? (
                <ul className="flex items-center flex-wrap gap-2">
                  {notSubmittedYet.map((guard) => (
                    <li key={guard.id} className="px-2 py-1 rounded bg-red-300">
                      {guard.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">כולם הגישו משמרות</p>
              )}
            </div>

            {guardsScheduleNotes.length > 0 && (
              <div>
                <h3 className="text-lg font-bold">
                  הערות כלליות ({guardsScheduleNotes.length})
                </h3>
                {guardsScheduleNotes.map((note) => (
                  <p key={note.id} className="flex items-center gap-1">
                    <span className="font-semibold">{note.user.name}</span>
                    <span>-</span>
                    <span>{note.content}</span>
                  </p>
                ))}
              </div>
            )}

            <WeeklyAvailabilities />
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
