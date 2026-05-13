import { GuardWeeklyNote } from "@/app/generated/prisma/client";

interface WeeklyNotesProps {
  weeklyNotes: (GuardWeeklyNote & { user: { name: string } })[];
}

export function WeeklyNotes({ weeklyNotes }: WeeklyNotesProps) {
  return (
    <ul>
      {weeklyNotes.map((note) => (
        <li key={note.id} className="flex items-center gap-1">
          <span className="font-medium">{note.user.name}:</span>
          <span>{note.content}</span>
        </li>
      ))}
    </ul>
  );
}
