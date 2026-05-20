"use client";

import { GuardPill } from "@/app/admin/buildings/[buildingId]/schedule/_components/guard-pill";
import { ScheduleStats } from "@/app/admin/buildings/[buildingId]/schedule/_components/schedule-stats";
import { StatPill } from "@/app/admin/buildings/[buildingId]/schedule/_components/stat-pill";
import { ScheduleProps } from "@/app/admin/buildings/[buildingId]/schedule/types";
import { Availability } from "@/app/generated/prisma/client";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";
import SectionCard from "@/components/shared/section-card";
import { DAY_LABELS, DAY_LABELS_SHORT, SHIFT_LABELS } from "@/lib/labels";
import { useState } from "react";

export function ScheduleMobile({
  activeGuardsCount,
  availabilities,
  weeklyNotes,
  emptyShiftsCount,
  notSubmittedGuardsCount,
}: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("SUNDAY");

  return (
    <div className="flex flex-col gap-4 px-1">
      <StatPill
        count={activeGuardsCount}
        singularLabel="שומר פעיל"
        pluralLabel="שומרים פעילים"
        className="bg-[#e1f3de] text-[#27500A] self-start"
      />

      <ScheduleStats
        emptyShiftsCount={emptyShiftsCount}
        notSubmittedGuardsCount={notSubmittedGuardsCount}
        weeklyNotesCount={weeklyNotes.length}
      />

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
          {(Object.keys(SHIFT_LABELS) as ShiftType[])
            .filter((shift) => shift !== "NIGHT")
            .map((shift) => (
              <ShiftBlock
                key={shift}
                type={shift}
                availabilities={availabilities.filter(
                  (a) => a.dayOfWeek === selectedDay && a.shiftType === shift,
                )}
              />
            ))}
        </div>
      </div>

      <SectionCard className="border">
        <h3 className="text-lg font-semibold">הערות כלליות</h3>
        {weeklyNotes.length > 0 ? (
          <ul>
            {weeklyNotes.map((note) => (
              <li key={note.id} className="flex items-start gap-1">
                <span className="font-medium">{note.user.name}:</span>
                <span>{note.content}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">אין הערות</p>
        )}
      </SectionCard>
    </div>
  );
}

interface ShiftBlockProps {
  type: ShiftType;
  availabilities: (Availability & { user: { name: string } })[];
}

function ShiftBlock({ type, availabilities }: ShiftBlockProps) {
  const shiftNotes = availabilities.filter((a) => a.shiftNote !== null);

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <h4 className="font-bold">{SHIFT_LABELS[type]}</h4>
      {availabilities.length > 0 ? (
        <ul className="flex items-center gap-1.5 flex-wrap">
          {availabilities.map((a) => (
            <li key={a.id}>
              <GuardPill name={a.user.name} hasNotes={!!a.shiftNote} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">אף שומר לא הציע את עצמו</p>
      )}

      {shiftNotes.length > 0 && (
        <ul className="bg-[#F5F4ED] rounded-lg px-4 py-2">
          {shiftNotes.map((note) => (
            <li key={note.id} className="flex gap-1">
              <span className="text-orange-500">&#9679;</span>
              <div className="flex gap-1">
                <span className="font-medium whitespace-nowrap">
                  {note.user.name}:
                </span>
                <span>{note.shiftNote}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
