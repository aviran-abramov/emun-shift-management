import { GuardPill } from "@/app/admin/schedule/[buildingId]/_components/guard-pill";
import { ScheduleProps } from "@/app/admin/schedule/[buildingId]/types";
import { Availability, GuardWeeklyNote } from "@/app/generated/prisma/client";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";

export function ScheduleDesktop({
  guards,
  availabilities,
  weeklyNotes,
}: ScheduleProps) {
  const shiftNotes = availabilities.filter(
    (availability) => availability.shiftNote,
  );

  const notSubmittedGuards = guards.filter(
    (g) => !availabilities.some((a) => a.userId === g.id),
  );

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm">
        {notSubmittedGuards.length > 0 && (
          <p className="bg-[#F6EEDF] text-[#5A4815] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
            <span>{notSubmittedGuards.length}</span>
            <span>לא הגיש{notSubmittedGuards.length > 1 ? "ו" : ""}</span>
          </p>
        )}

        {weeklyNotes.length > 0 && (
          <p className="bg-[#D6E4F6] text-[#3266AD] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
            <span>{weeklyNotes.length}</span>
            <span>
              {weeklyNotes.length > 1 ? "הערות כלליות" : "הערה כללית"}
            </span>
          </p>
        )}
      </div>

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
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "SUNDAY" && a.shiftType === "MORNING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "MONDAY" && a.shiftType === "MORNING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "TUESDAY" && a.shiftType === "MORNING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter(
                  (a) => a.day === "WEDNESDAY" && a.shiftType === "MORNING",
                )
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter(
                  (a) => a.day === "THURSDAY" && a.shiftType === "MORNING",
                )
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "FRIDAY" && a.shiftType === "MORNING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter(
                  (a) => a.day === "SATURDAY" && a.shiftType === "MORNING",
                )
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
          </tr>

          <tr>
            <th scope="row">ערב</th>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "SUNDAY" && a.shiftType === "EVENING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "MONDAY" && a.shiftType === "EVENING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "TUESDAY" && a.shiftType === "EVENING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter(
                  (a) => a.day === "WEDNESDAY" && a.shiftType === "EVENING",
                )
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter(
                  (a) => a.day === "THURSDAY" && a.shiftType === "EVENING",
                )
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "FRIDAY" && a.shiftType === "EVENING")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter(
                  (a) => a.day === "SATURDAY" && a.shiftType === "EVENING",
                )
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
          </tr>

          <tr>
            <th scope="row">לילה</th>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "SUNDAY" && a.shiftType === "NIGHT")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "MONDAY" && a.shiftType === "NIGHT")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "TUESDAY" && a.shiftType === "NIGHT")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "WEDNESDAY" && a.shiftType === "NIGHT")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "THURSDAY" && a.shiftType === "NIGHT")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "FRIDAY" && a.shiftType === "NIGHT")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
            <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
              {availabilities
                .filter((a) => a.day === "SATURDAY" && a.shiftType === "NIGHT")
                .map((a) => (
                  <GuardPill
                    key={a.id}
                    name={a.user.name}
                    hasNotes={!!a.shiftNote}
                  />
                ))}
            </td>
          </tr>
        </tbody>
      </table>

      <WeeklyNotes weeklyNotes={weeklyNotes} />
      <ShiftNotes shiftNotes={shiftNotes} />
    </section>
  );
}

interface ShiftNotesProps {
  shiftNotes: (Availability & { user: { name: string } })[];
}

function ShiftNotes({ shiftNotes }: ShiftNotesProps) {
  return (
    <div className="bg-[#F5F4ED] rounded-lg px-4 py-2">
      <h3 className="text-lg font-semibold">הערות לפי משמרת</h3>
      {shiftNotes.length > 0 ? (
        <ul>
          {shiftNotes.map((note) => (
            <li key={note.id} className="flex items-start gap-1 font-medium">
              <span className="text-muted-foreground">
                {DAY_LABELS[note.day]}
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
    </div>
  );
}

interface WeeklyNotesProps {
  weeklyNotes: (GuardWeeklyNote & { user: { name: string } })[];
}

function WeeklyNotes({ weeklyNotes }: WeeklyNotesProps) {
  if (weeklyNotes.length === 0) return;

  return (
    <div className="bg-[#F5F4ED] rounded-lg px-4 py-2">
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
    </div>
  );
}
