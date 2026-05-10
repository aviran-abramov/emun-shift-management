import { GuardScheduleNote } from "@/app/generated/prisma/client";

interface GuardScheduleNotesProps {
  notes: (GuardScheduleNote & { user: { name: string } })[];
}

export function GuardScheduleNotes({ notes }: GuardScheduleNotesProps) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} className="flex items-center gap-1">
          <span className="font-medium">{note.user.name}:</span>
          <span>{note.content}</span>
        </li>
      ))}
    </ul>
  );
}
