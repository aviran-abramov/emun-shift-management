"use client";

import { Availability } from "@/app/generated/prisma/client";
import { DeleteAvailabilityNoteButton } from "@/app/guard/availability/_components/delete-availability-note-button";
import SaveAvailabilityNoteForm from "@/app/guard/availability/_components/save-availability-note-form";
import { SectionTitle } from "@/components/layout/section-title";
import SectionCard from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
import { useState } from "react";

interface AvailabilityNotesProps {
  availabilities: Availability[];
}

export function AvailabilityNotes({ availabilities }: AvailabilityNotesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const availabilitiesWithNotes = availabilities.filter((a) => a.shiftNote);

  const handleTrigger = () => setIsOpen((prevState) => !prevState);

  return (
    <SectionCard className="space-y-2">
      <SectionTitle>הערות למשמרות ספציפיות</SectionTitle>

      {availabilitiesWithNotes.length > 0 ? (
        <ul>
          {availabilitiesWithNotes.map((a) => (
            <li key={a.id} className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-orange-500/80 text-xs">&#9679;</span>
                <span className="text-muted-foreground">
                  {DAY_LABELS[a.dayOfWeek]}
                </span>
                <span className="text-muted-foreground">
                  {SHIFT_LABELS[a.shiftType]}
                </span>
                <span>-</span>
                <span>{a.shiftNote}</span>
              </div>
              <DeleteAvailabilityNoteButton availabilityId={a.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">לא הוספת הערות</p>
      )}

      {!isOpen ? (
        <Button type="button" onClick={handleTrigger}>
          <span className="text-xl font-bold">+</span>
          <span>הוסף הערה</span>
        </Button>
      ) : (
        <SaveAvailabilityNoteForm onTrigger={handleTrigger} />
      )}
    </SectionCard>
  );
}
