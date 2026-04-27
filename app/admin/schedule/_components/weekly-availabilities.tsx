import { Availability } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function WeeklyAvailabilities() {
  const availabilties = await prisma.availability.findMany({
    include: { user: true },
  });
  if (!availabilties) {
    return <p>לא הוגשו אילוצים</p>;
  }

  const sunday = availabilties.filter(
    (availability) => availability.day === "SUNDAY",
  );
  const sundayMorning = sunday.filter(
    (availability) => availability.shiftType === "MORNING",
  );
  const sundayEvening = sunday.filter(
    (availability) => availability.shiftType === "EVENING",
  );
  const sundayNight = sunday.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  const monday = availabilties.filter(
    (availability) => availability.day === "MONDAY",
  );
  const mondayMorning = monday.filter(
    (availability) => availability.shiftType === "MORNING",
  );
  const mondayEvening = monday.filter(
    (availability) => availability.shiftType === "EVENING",
  );
  const mondayNight = monday.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  const tuesday = availabilties.filter(
    (availability) => availability.day === "TUESDAY",
  );
  const tuesdayMorning = tuesday.filter(
    (availability) => availability.shiftType === "MORNING",
  );
  const tuesdayEvening = tuesday.filter(
    (availability) => availability.shiftType === "EVENING",
  );
  const tuesdayNight = tuesday.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  const wednesday = availabilties.filter(
    (availability) => availability.day === "WEDNESDAY",
  );
  const wednesdayMorning = wednesday.filter(
    (availability) => availability.shiftType === "MORNING",
  );
  const wednesdayEvening = wednesday.filter(
    (availability) => availability.shiftType === "EVENING",
  );
  const wednesdayNight = wednesday.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  const thursday = availabilties.filter(
    (availability) => availability.day === "THURSDAY",
  );
  const thursdayMorning = thursday.filter(
    (availability) => availability.shiftType === "MORNING",
  );
  const thursdayEvening = thursday.filter(
    (availability) => availability.shiftType === "EVENING",
  );
  const thursdayNight = thursday.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  const friday = availabilties.filter(
    (availability) => availability.day === "FRIDAY",
  );
  const fridayMorning = friday.filter(
    (availability) => availability.shiftType === "MORNING",
  );
  const fridayEvening = friday.filter(
    (availability) => availability.shiftType === "EVENING",
  );
  const fridayNight = friday.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  const saturday = availabilties.filter(
    (availability) => availability.day === "SATURDAY",
  );
  const saturdayMorning = saturday.filter(
    (availability) => availability.shiftType === "MORNING",
  );
  const saturdayEvening = saturday.filter(
    (availability) => availability.shiftType === "EVENING",
  );
  const saturdayNight = saturday.filter(
    (availability) => availability.shiftType === "NIGHT",
  );

  return (
    <div className="flex flex-col gap-0.5">
      <h3 className="text-xl font-bold">אילוצים</h3>

      <div className="flex flex-col mb-4">
        <DayTitle>ראשון</DayTitle>

        <ShiftTypeTitle>בוקר</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={sundayMorning} />

        <ShiftTypeTitle>ערב</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={sundayEvening} />

        <ShiftTypeTitle>לילה</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={sundayNight} />
      </div>

      <div className="flex flex-col">
        <DayTitle>שני</DayTitle>

        <ShiftTypeTitle>בוקר</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={mondayMorning} />

        <ShiftTypeTitle>ערב</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={mondayEvening} />

        <ShiftTypeTitle>לילה</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={mondayNight} />
      </div>

      <div className="flex flex-col">
        <DayTitle>שלישי</DayTitle>

        <ShiftTypeTitle>בוקר</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={tuesdayMorning} />

        <ShiftTypeTitle>ערב</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={tuesdayEvening} />

        <ShiftTypeTitle>לילה</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={tuesdayNight} />
      </div>

      <div className="flex flex-col">
        <DayTitle>רביעי</DayTitle>

        <ShiftTypeTitle>בוקר</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={wednesdayMorning} />

        <ShiftTypeTitle>ערב</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={wednesdayEvening} />

        <ShiftTypeTitle>לילה</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={wednesdayNight} />
      </div>

      <div className="flex flex-col">
        <DayTitle>חמישי</DayTitle>

        <ShiftTypeTitle>בוקר</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={thursdayMorning} />

        <ShiftTypeTitle>ערב</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={thursdayEvening} />

        <ShiftTypeTitle>לילה</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={thursdayNight} />
      </div>

      <div className="flex flex-col">
        <DayTitle>שישי</DayTitle>

        <ShiftTypeTitle>בוקר</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={fridayMorning} />

        <ShiftTypeTitle>ערב</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={fridayEvening} />

        <ShiftTypeTitle>לילה</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={fridayNight} />
      </div>

      <div className="flex flex-col">
        <DayTitle>שבת</DayTitle>

        <ShiftTypeTitle>בוקר</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={saturdayMorning} />

        <ShiftTypeTitle>ערב</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={saturdayEvening} />

        <ShiftTypeTitle>לילה</ShiftTypeTitle>
        <ShiftAvailabilities availabilities={saturdayNight} />
      </div>
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
