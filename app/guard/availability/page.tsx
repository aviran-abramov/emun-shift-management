import { CreateAvailabilityForm } from "@/app/guard/_components/create-availability-form";
import { CreateWeeklyNoteForm } from "@/app/guard/_components/create-weekly-note-form";
import { DeleteAvailabilityButton } from "@/app/guard/_components/delete-availability-button";
import { DeleteWeeklyNoteButton } from "@/app/guard/_components/delete-weekly-note-button";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { SectionTitle } from "@/components/layout/section-title";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export default async function GuardAvailabilityPage() {
  const session = await requireRole("GUARD");

  const [availabilities, weeklyNote] = await Promise.all([
    prisma.availability.findMany({ where: { userId: session.user.id } }),
    prisma.guardWeeklyNote.findUnique({ where: { userId: session.user.id } }),
  ]);

  return (
    <PageContainer className="max-w-md">
      <div className="flex flex-col gap-4">
        <PageTitle title="הגשת משמרות" />

        <section className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
          <SectionTitle>הוסף משמרת</SectionTitle>
          <CreateAvailabilityForm />
        </section>

        <section className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
          <SectionTitle>הערות כלליות</SectionTitle>
          {weeklyNote ? (
            <div className="space-y-2">
              <p className="mr-1">{weeklyNote.content}</p>
              <DeleteWeeklyNoteButton id={weeklyNote.id} />
            </div>
          ) : (
            <CreateWeeklyNoteForm />
          )}
        </section>

        <section className="rounded-lg border p-4 shadow-sm space-y-4">
          <SectionTitle>המשמרות שהגשתי</SectionTitle>
          {availabilities.length !== 0 ? (
            <ul className="flex flex-col gap-2">
              {availabilities.map((availability) => (
                <li
                  key={availability.id}
                  className="font-medium rounded-md border bg-muted/50 px-3 py-2 space-y-1"
                >
                  <div className="flex items-center gap-1 text-lg">
                    <span>{DAY_LABELS[availability.day]}</span>
                    <span>-</span>
                    <span>{SHIFT_LABELS[availability.shiftType]}</span>
                  </div>
                  {availability.shiftNote && (
                    <p className="flex items-center gap-1">
                      <span className="font-semibold">הערה:</span>
                      <span>{availability.shiftNote}</span>
                    </p>
                  )}
                  <DeleteAvailabilityButton id={availability.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              לא הוגשו עדיין משמרות לשבוע הבא
            </p>
          )}
        </section>
      </div>
    </PageContainer>
  );
}
