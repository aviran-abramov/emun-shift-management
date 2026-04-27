import { Availability } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function WeeklyAvailabilities() {
  const availabilties = await prisma.availability.findMany({
    include: { user: true },
  });
  if (availabilties.length === 0) return <p>לא הוגשו אילוצים</p>;

  const sunday = availabilties.filter(
    (availability) => availability.day === "SUNDAY",
  );
  const monday = availabilties.filter(
    (availability) => availability.day === "MONDAY",
  );
  const tuesday = availabilties.filter(
    (availability) => availability.day === "TUESDAY",
  );
  const wednesday = availabilties.filter(
    (availability) => availability.day === "WEDNESDAY",
  );
  const thursday = availabilties.filter(
    (availability) => availability.day === "THURSDAY",
  );
  const friday = availabilties.filter(
    (availability) => availability.day === "FRIDAY",
  );
  const saturday = availabilties.filter(
    (availability) => availability.day === "SATURDAY",
  );

  return (
    <div className="flex flex-col gap-0.5">
      <h3 className="text-xl font-bold">אילוצים</h3>

      <DaySection dayName="ראשון" availabilities={sunday} />
      <DaySection dayName="שני" availabilities={monday} />
      <DaySection dayName="שלישי" availabilities={tuesday} />
      <DaySection dayName="רביעי" availabilities={wednesday} />
      <DaySection dayName="חמישי" availabilities={thursday} />
      <DaySection dayName="שישי" availabilities={friday} />
      <DaySection dayName="שבת" availabilities={saturday} />
    </div>
  );
}

interface DaySectionProps {
  dayName: string;
  availabilities: (Availability & { user: { name: string } })[];
}

function DaySection({ dayName, availabilities }: DaySectionProps) {
  if (availabilities.length === 0) return null;

  const morning = availabilities.filter(
    (availability) => availability.shiftType === "MORNING",
  );

  const evening = availabilities.filter(
    (availability) => availability.shiftType === "EVENING",
  );

  const night = availabilities.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  return (
    <div className="flex flex-col mb-4">
      <DayTitle>{dayName}</DayTitle>

      {morning.length > 0 && (
        <>
          <ShiftTypeTitle>בוקר</ShiftTypeTitle>
          <ShiftAvailabilities availabilities={morning} />
        </>
      )}

      {evening.length > 0 && (
        <>
          <ShiftTypeTitle>ערב</ShiftTypeTitle>
          <ShiftAvailabilities availabilities={evening} />
        </>
      )}

      {night.length > 0 && (
        <>
          <ShiftTypeTitle>לילה</ShiftTypeTitle>
          <ShiftAvailabilities availabilities={night} />
        </>
      )}
    </div>
  );
}

interface ShiftAvailabilitiesProps {
  availabilities: (Availability & { user: { name: string } })[];
}

function ShiftAvailabilities({ availabilities }: ShiftAvailabilitiesProps) {
  return (
    <div className="flex flex-col">
      {availabilities.map((availability) => (
        <SingleAvailability
          key={availability.id}
          name={availability.user.name}
          note={availability.note}
        />
      ))}
    </div>
  );
}

interface SingleAvailabilityProps {
  name: string;
  note?: string | null;
}

function SingleAvailability({ name, note }: SingleAvailabilityProps) {
  return (
    <div className="flex items-center gap-2">
      <span>{name}</span>
      {note && (
        <>
          <span>-</span>
          <span className="text-orange-600">{note}</span>
        </>
      )}
    </div>
  );
}

interface DayTitleProps {
  children: React.ReactNode;
}

function DayTitle({ children }: DayTitleProps) {
  return (
    <h4 className="mb-2 bg-muted border border-black self-start px-2 rounded text-lg font-semibold">
      יום {children}
    </h4>
  );
}

interface ShiftTypeTitleProps {
  children: React.ReactNode;
}

function ShiftTypeTitle({ children }: ShiftTypeTitleProps) {
  return (
    <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
      {children}
    </h5>
  );
}
