import { GuardWeeklyNote } from "@/app/generated/prisma/client";
import { CreateWeeklyNoteForm } from "@/app/guard/_components/create-weekly-note-form";
import { DeleteWeeklyNoteButton } from "@/app/guard/_components/delete-weekly-note-button";
import { SectionTitle } from "@/components/layout/section-title";

interface WeeklyNoteProps {
  note: GuardWeeklyNote | null;
}

export function WeeklyNote({ note }: WeeklyNoteProps) {
  return (
    <section className="max-w-sm bg-[#F5F4ED] rounded-lg px-4 py-2">
      <SectionTitle>הערות כלליות</SectionTitle>
      {note ? (
        <div className="space-y-2">
          <p className="mr-1 whitespace-pre-wrap">{note.content}</p>
          <DeleteWeeklyNoteButton id={note.id} />
        </div>
      ) : (
        <CreateWeeklyNoteForm />
      )}
    </section>
  );
}
