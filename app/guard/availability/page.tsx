import { CreateAvailabilitiesGridForm } from "@/app/guard/_components/create-availabilities-grid-form";
import { AvailabilityNotes } from "@/app/guard/availability/_components/availability-notes";
import { WeeklyNote } from "@/app/guard/availability/_components/weekly-note";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import SectionCard from "@/components/shared/section-card";
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

      <SectionCard className="px-2">
        <CreateAvailabilitiesGridForm availabilities={availabilities} />
      </SectionCard>

      <AvailabilityNotes availabilities={availabilities} />

      <WeeklyNote note={weeklyNote} />
    </PageContainer>
  );
}
