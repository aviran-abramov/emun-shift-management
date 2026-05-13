import { Availability, GuardWeeklyNote } from "@/app/generated/prisma/client";

export interface ScheduleProps {
  activeGuardsCount: number;
  availabilities: (Availability & { user: { name: string } })[];
  weeklyNotes: (GuardWeeklyNote & { user: { name: string } })[];
  emptyShiftsCount: number;
  notSubmittedGuardsCount: number;
}
