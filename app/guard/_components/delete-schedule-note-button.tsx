"use client";

import { deleteScheduleNote } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";

interface DeleteScheduleNoteButtonProps {
  id: string;
}

export function DeleteScheduleNoteButton({ id }: DeleteScheduleNoteButtonProps) {
  return (
    <Button variant="outline" onClick={() => deleteScheduleNote({ id })}>
      הסר
    </Button>
  );
}
