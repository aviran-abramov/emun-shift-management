import { Availability, GuardScheduleNote } from "@/app/generated/prisma/client";

export interface ScheduleProps {
  availabilities: (Availability & { user: { name: string } })[];
  generalNotes: (GuardScheduleNote & { user: { name: string } })[];
}
