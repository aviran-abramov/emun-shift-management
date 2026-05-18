"use client";

import { deleteAvailabilityNote } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteAvailabilityNoteButtonProps {
  availabilityId: string;
}

export function DeleteAvailabilityNoteButton({
  availabilityId,
}: DeleteAvailabilityNoteButtonProps) {
  const handleClick = async () => {
    const result = await deleteAvailabilityNote({ availabilityId });
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("ההערה נמחקה בהצלחה!");
  };

  return (
    <Button type="button" variant="outline" onClick={handleClick}>
      הסר
    </Button>
  );
}
