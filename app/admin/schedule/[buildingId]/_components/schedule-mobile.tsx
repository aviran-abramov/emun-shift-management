"use client";

import { GuardPill } from "@/app/admin/schedule/[buildingId]/_components/guard-pill";
import { ScheduleProps } from "@/app/admin/schedule/[buildingId]/types";
import { Availability } from "@/app/generated/prisma/client";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";
import { DAY_LABELS, DAY_LABELS_SHORT, SHIFT_LABELS } from "@/lib/labels";
import { useState } from "react";

export function ScheduleMobile({
  availabilities,
  generalNotes,
}: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("SUNDAY");

  const notes = availabilities.filter((availability) => availability.note);

  return (
    <section className="flex flex-col gap-2 px-1">
      <ul className="grid grid-cols-7 border-b pb-3">
        {Object.entries(DAY_LABELS_SHORT).map(([key, value]) => (
          <li
            onClick={() => setSelectedDay(key as DayOfWeek)}
            className={`hover:cursor-pointer transition-all duration-300 aspect-square flex items-center justify-center font-medium text-center rounded-lg ${selectedDay === key ? "bg-[#D6E4F6] text-cyan-800 font-semibold" : ""}`}
            key={key}
          >
            {value}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <h3 className="flex items-center gap-1 font-bold text-xl">
          <span>יום</span>
          <span>{DAY_LABELS[selectedDay]}</span>
        </h3>

        <div className="flex flex-col gap-3">
          {(Object.keys(SHIFT_LABELS) as ShiftType[]).map((shift) => (
            <ShiftBlock
              key={shift}
              type={shift}
              availabilities={availabilities.filter(
                (a) => a.day === selectedDay && a.shiftType === shift,
              )}
            />
          ))}
        </div>
      </div>

      <div className="bg-[#F5F4ED] rounded-lg px-4 py-2">
        <h3 className="text-lg font-semibold">הערות לפי משמרת</h3>
        {notes.length > 0 ? (
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="flex items-center gap-1 font-medium">
                <span className="text-muted-foreground">
                  {DAY_LABELS[note.day]}
                </span>
                <span className="text-muted-foreground">
                  {SHIFT_LABELS[note.shiftType]}
                </span>
                <span>-</span>
                <span>{note.user.name} ביקש:</span>
                <span>{note.note}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>אין הערות</p>
        )}
      </div>

      <div className="bg-[#F5F4ED] border rounded-lg px-4 py-2">
        <h3 className="text-lg font-semibold">הערות כלליות</h3>
        {generalNotes.length > 0 ? (
          <ul>
            {generalNotes.map((note) => (
              <li key={note.id} className="flex items-center gap-1">
                <span className="font-medium">{note.user.name}:</span>
                <span>{note.content}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">אין הערות</p>
        )}
      </div>
    </section>
  );
}

interface ShiftBlockProps {
  type: ShiftType;
  availabilities: (Availability & { user: { name: string } })[];
}

function ShiftBlock({ type, availabilities }: ShiftBlockProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <h4 className="font-bold">{SHIFT_LABELS[type]}</h4>
      {availabilities.length > 0 ? (
        <ul className="flex items-center gap-1.5 flex-wrap">
          {availabilities.map((a) => (
            <li key={a.id}>
              <GuardPill name={a.user.name} hasNotes={!!a.note} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">אף שומר לא הציע את עצמו</p>
      )}
    </div>
  );
}
