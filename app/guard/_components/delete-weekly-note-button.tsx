"use client";

import { deleteWeeklyNote } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";

interface DeleteWeeklyNoteButtonProps {
  id: string;
}

export function DeleteWeeklyNoteButton({ id }: DeleteWeeklyNoteButtonProps) {
  return (
    <Button variant="outline" onClick={() => deleteWeeklyNote({ id })}>
      הסר
    </Button>
  );
}
