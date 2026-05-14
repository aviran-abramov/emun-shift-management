"use client";

import { deleteWeeklyNote } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteWeeklyNoteButtonProps {
  id: string;
}

export function DeleteWeeklyNoteButton({ id }: DeleteWeeklyNoteButtonProps) {
  const handleClick = async () => {
    const result = await deleteWeeklyNote({ id });
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("ההערות נמחקו בהצלחה!");
  };

  return (
    <Button type="button" variant="outline" onClick={handleClick}>
      הסר
    </Button>
  );
}
