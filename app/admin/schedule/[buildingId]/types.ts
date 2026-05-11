import { Availability, GuardWeeklyNote } from "@/app/generated/prisma/client";

export interface ScheduleProps {
  availabilities: (Availability & { user: { name: string } })[];
  weeklyNotes: (GuardWeeklyNote & { user: { name: string } })[];
  emptyShiftsCount: number;
  notSubmittedGuardsCount: number;
}
