import { Availability, GuardWeeklyNote } from "@/app/generated/prisma/client";

export interface ScheduleProps {
  guards: { id: string; name: string }[];
  availabilities: (Availability & { user: { name: string } })[];
  weeklyNotes: (GuardWeeklyNote & { user: { name: string } })[];
}
