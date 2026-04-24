"use client";

import { deleteAvailability } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";

interface DeleteAvailabilityButtonProps {
  id: string;
}

export function DeleteAvailabilityButton({
  id,
}: DeleteAvailabilityButtonProps) {
  return (
    <Button variant="outline" onClick={() => deleteAvailability({ id })}>
      הסר
    </Button>
  );
}
