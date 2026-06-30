import { GuardPill } from "@/app/admin/buildings/[buildingId]/schedule/_components/guard-pill";
import { ScheduleProps } from "@/app/admin/buildings/[buildingId]/schedule/types";
import {
  Availability,
  BuildingShiftSlotConfig,
  DayOfWeek,
  GuardWeeklyNote,
  ShiftType,
} from "@/app/generated/prisma/client";
import SectionCard from "@/components/shared/section-card";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";

export function ScheduleDesktop({
  availabilities,
  weeklyNotes,
  shiftSlotConfigs,
}: ScheduleProps) {
  const shiftNotes = availabilities.filter(
    (availability) => availability.shiftNote,
  );

  return (
    <div className="flex flex-col gap-4">
      <table
        dir="rtl"
        className="border-separate border-spacing-1 table-fixed w-full"
      >
        <thead>
          <tr>
            <th scope="col" className="w-16"></th>
            {Object.entries(DAY_LABELS).map(([key, value]) => (
              <th key={key} scope="col">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">בוקר</th>
            <ShiftCell
              day="SUNDAY"
              shiftType="MORNING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="MONDAY"
              shiftType="MORNING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="TUESDAY"
              shiftType="MORNING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="WEDNESDAY"
              shiftType="MORNING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="THURSDAY"
              shiftType="MORNING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="FRIDAY"
              shiftType="MORNING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="SATURDAY"
              shiftType="MORNING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
          </tr>

          <tr>
            <th scope="row">ערב</th>
            <ShiftCell
              day="SUNDAY"
              shiftType="EVENING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="MONDAY"
              shiftType="EVENING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="TUESDAY"
              shiftType="EVENING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="WEDNESDAY"
              shiftType="EVENING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="THURSDAY"
              shiftType="EVENING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="FRIDAY"
              shiftType="EVENING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="SATURDAY"
              shiftType="EVENING"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
          </tr>

          <tr>
            <th scope="row">לילה</th>
            <ShiftCell
              day="SUNDAY"
              shiftType="NIGHT"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="MONDAY"
              shiftType="NIGHT"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="TUESDAY"
              shiftType="NIGHT"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="WEDNESDAY"
              shiftType="NIGHT"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="THURSDAY"
              shiftType="NIGHT"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="FRIDAY"
              shiftType="NIGHT"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
            <ShiftCell
              day="SATURDAY"
              shiftType="NIGHT"
              availabilities={availabilities}
              shiftSlotConfigs={shiftSlotConfigs}
            />
          </tr>
        </tbody>
      </table>

      <WeeklyNotes weeklyNotes={weeklyNotes} />
      <ShiftNotes shiftNotes={shiftNotes} />
    </div>
  );
}

interface ShiftCellProps {
  day: DayOfWeek;
  shiftType: ShiftType;
  shiftSlotConfigs: BuildingShiftSlotConfig[];
  availabilities: (Availability & { user: { name: string } })[];
}

function ShiftCell({
  day,
  shiftType,
  shiftSlotConfigs,
  availabilities,
}: ShiftCellProps) {
  const config = shiftSlotConfigs.find(
    (slot) => slot.dayOfWeek === day && slot.shiftType === shiftType,
  );

  if (!config?.isEnabled)
    return (
      <td className="bg-gray-300 rounded">
        <p className="font-semibold text-center text-black/35">לא פעיל</p>
      </td>
    );

  const slots = availabilities.filter(
    (a) => a.dayOfWeek === day && a.shiftType === shiftType,
  );

  if (slots.length === 0)
    return (
      <td className="bg-[#F7ECEC] rounded">
        <p className="text-[#7F2C28] font-semibold text-center">חסר</p>
      </td>
    );

  return (
    <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
      {slots.map((a) => (
        <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.shiftNote} />
      ))}
    </td>
  );
}

interface ShiftNotesProps {
  shiftNotes: (Availability & { user: { name: string } })[];
}

function ShiftNotes({ shiftNotes }: ShiftNotesProps) {
  return (
    <SectionCard>
      <h3 className="text-lg font-semibold">הערות לפי משמרת</h3>
      {shiftNotes.length > 0 ? (
        <ul>
          {shiftNotes.map((note) => (
            <li key={note.id} className="flex items-start gap-1 font-medium">
              <span className="text-muted-foreground">
                {DAY_LABELS[note.dayOfWeek]}
              </span>
              <span className="text-muted-foreground">
                {SHIFT_LABELS[note.shiftType]}
              </span>
              <span>-</span>
              <span className="whitespace-nowrap">{note.user.name} ביקש:</span>
              <span>{note.shiftNote}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>אין הערות</p>
      )}
    </SectionCard>
  );
}

interface WeeklyNotesProps {
  weeklyNotes: (GuardWeeklyNote & { user: { name: string } })[];
}

function WeeklyNotes({ weeklyNotes }: WeeklyNotesProps) {
  if (weeklyNotes.length === 0) return;

  return (
    <SectionCard>
      <h3 className="text-lg font-semibold">הערות כלליות</h3>
      {weeklyNotes.length > 0 ? (
        <ul>
          {weeklyNotes.map((note) => (
            <li key={note.id} className="flex items-center gap-1">
              <span className="font-medium">{note.user.name}:</span>
              <span>{note.content}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>אין הערות</p>
      )}
    </SectionCard>
  );
}
