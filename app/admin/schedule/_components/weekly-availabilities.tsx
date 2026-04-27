import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

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

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          בוקר
        </h5>
        {sundayMorning.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          ערב
        </h5>
        {sundayEvening.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          לילה
        </h5>
        {sundayNight.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <DayTitle>שני</DayTitle>

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          בוקר
        </h5>
        {mondayMorning.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          ערב
        </h5>
        {mondayEvening.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          לילה
        </h5>
        {mondayNight.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <DayTitle>שלישי</DayTitle>

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          בוקר
        </h5>
        {tuesdayMorning.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          ערב
        </h5>
        {tuesdayEvening.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          לילה
        </h5>
        {tuesdayNight.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <DayTitle>רביעי</DayTitle>

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          בוקר
        </h5>
        {wednesdayMorning.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          ערב
        </h5>
        {wednesdayEvening.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          לילה
        </h5>
        {wednesdayNight.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <DayTitle>חמישי</DayTitle>

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          בוקר
        </h5>
        {thursdayMorning.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          ערב
        </h5>
        {thursdayEvening.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          לילה
        </h5>
        {thursdayNight.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <DayTitle>שישי</DayTitle>

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          בוקר
        </h5>
        {fridayMorning.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          ערב
        </h5>
        {fridayEvening.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          לילה
        </h5>
        {fridayNight.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <DayTitle>שבת</DayTitle>

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          בוקר
        </h5>
        {saturdayMorning.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          ערב
        </h5>
        {saturdayEvening.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}

        <h5 className="text-sm bg-muted border border-black self-start px-2 font-semibold rounded">
          לילה
        </h5>
        {saturdayNight.map((availability) => (
          <div key={availability.id} className="flex items-center gap-2">
            <SingleAvailability
              name={availability.user.name}
              note={availability.note}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface SingleAvailabilityProps {
  name: string;
  note?: string | null;
}

function SingleAvailability({ name, note }: SingleAvailabilityProps) {
  return (
    <>
      <span>{name}</span>
      {note && (
        <>
          <span>-</span>
          <span className="text-orange-600">{note}</span>
        </>
      )}
    </>
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
