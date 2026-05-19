import { CreateAvailabilitiesGridForm } from "@/app/guard/_components/create-availabilities-grid-form";
import { AvailabilityNotes } from "@/app/guard/availability/_components/availability-notes";
import { WeeklyNote } from "@/app/guard/availability/_components/weekly-note";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
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
      <PageTitle title="הגשת משמרות" />

      <section className="bg-[#F5F4ED] rounded-lg p-2">
        <CreateAvailabilitiesGridForm availabilities={availabilities} />
      </section>

      <AvailabilityNotes availabilities={availabilities} />

      <WeeklyNote note={weeklyNote} />
    </PageContainer>
  );
}
