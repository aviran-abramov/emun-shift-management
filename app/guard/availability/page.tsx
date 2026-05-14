import { CreateAvailabilitiesGridForm } from "@/app/guard/_components/create-availabilities-grid-form";
import { CreateWeeklyNoteForm } from "@/app/guard/_components/create-weekly-note-form";
import { DeleteWeeklyNoteButton } from "@/app/guard/_components/delete-weekly-note-button";
import { AvailabilityNotes } from "@/app/guard/availability/_components/availability-notes";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { SectionTitle } from "@/components/layout/section-title";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export default async function GuardAvailabilityPage() {
  const session = await requireRole("GUARD");

  const [availabilities, weeklyNote] = await Promise.all([
    prisma.availability.findMany({ where: { userId: session.user.id } }),
    prisma.guardWeeklyNote.findUnique({ where: { userId: session.user.id } }),
  ]);

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <PageTitle title="הגשת משמרות" />

        <section>
          <CreateAvailabilitiesGridForm availabilities={availabilities} />
        </section>

        <AvailabilityNotes availabilities={availabilities} />

        <section className="max-w-sm">
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
      </div>
    </PageContainer>
  );
}
