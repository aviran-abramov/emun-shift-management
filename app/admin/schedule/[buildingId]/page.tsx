import { Availability, GuardScheduleNote } from "@/app/generated/prisma/client";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AdminBuildingSchedulePage({
  params,
}: {
  params: Promise<{ buildingId: string }>;
}) {
  const { buildingId } = await params;
  const building = await prisma.building.findUnique({
    where: { id: buildingId },
    include: { users: { include: { availabilities: true } } },
  });
  if (!building) notFound();

  const availabilities = await prisma.availability.findMany({
    where: {
      user: { buildings: { some: { id: buildingId } } },
    },
    include: { user: true },
  });

  const notes = availabilities.filter((availability) => availability.note);
  const guardScheduleNotes = await prisma.guardScheduleNote.findMany({
    include: { user: true },
  });

  return (
    <PageContainer className="max-w-full flex flex-col gap-4">
      <PageTitle title={building.name} />

      <ScheduleTable availabilities={availabilities} />

      <GuardScheduleNotes notes={guardScheduleNotes} />

      <GuardShiftTypeNotes notes={notes} />
    </PageContainer>
  );
}

interface ScheduleTableProps {
  availabilities: (Availability & { user: { name: string } })[];
}

function ScheduleTable({ availabilities }: ScheduleTableProps) {
  return (
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
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "MONDAY" && a.shiftType === "MORNING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "TUESDAY" && a.shiftType === "MORNING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "WEDNESDAY" && a.shiftType === "MORNING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "THURSDAY" && a.shiftType === "MORNING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "FRIDAY" && a.shiftType === "MORNING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "SATURDAY" && a.shiftType === "MORNING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
        </tr>

        <tr>
          <th scope="row">ערב</th>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "SUNDAY" && a.shiftType === "EVENING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "MONDAY" && a.shiftType === "EVENING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "TUESDAY" && a.shiftType === "EVENING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "WEDNESDAY" && a.shiftType === "EVENING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "THURSDAY" && a.shiftType === "EVENING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "FRIDAY" && a.shiftType === "EVENING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "SATURDAY" && a.shiftType === "EVENING")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
        </tr>

        <tr>
          <th scope="row">לילה</th>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "SUNDAY" && a.shiftType === "NIGHT")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "MONDAY" && a.shiftType === "NIGHT")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "TUESDAY" && a.shiftType === "NIGHT")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "WEDNESDAY" && a.shiftType === "NIGHT")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "THURSDAY" && a.shiftType === "NIGHT")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "FRIDAY" && a.shiftType === "NIGHT")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
          <td className="bg-[#F6EEDF] p-1.5 rounded space-y-1 align-top">
            {availabilities
              .filter((a) => a.day === "SATURDAY" && a.shiftType === "NIGHT")
              .map((a) => (
                <GuardPill key={a.id} name={a.user.name} hasNotes={!!a.note} />
              ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

interface GuardPillProps {
  name: string;
  hasNotes: boolean;
}

function GuardPill({ name, hasNotes }: GuardPillProps) {
  return (
    <p className="bg-[#C0DD97] rounded px-1 flex items-center gap-1">
      <span>{name}</span>
      {hasNotes && (
        <span className="inline-block size-1.5 rounded-full bg-orange-500" />
      )}
    </p>
  );
}

interface GuardShiftTypeNotesProps {
  notes: (Availability & { user: { name: string } })[];
}

function GuardShiftTypeNotes({ notes }: GuardShiftTypeNotesProps) {
  return (
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
  );
}

interface GuardScheduleNotes {
  notes: (GuardScheduleNote & { user: { name: string } })[];
}

function GuardScheduleNotes({ notes }: GuardScheduleNotes) {
  if (notes.length === 0) return;

  return (
    <div className="bg-[#F5F4ED] rounded-lg px-4 py-2">
      <h3 className="text-lg font-semibold">הערות כלליות</h3>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
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
