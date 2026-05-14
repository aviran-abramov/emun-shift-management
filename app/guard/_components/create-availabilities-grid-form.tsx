"use client";

import { Availability } from "@/app/generated/prisma/client";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";
import { saveAvailabilities } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateAvailabilitiesGridFormProps {
  availabilities: Availability[];
}

export function CreateAvailabilitiesGridForm({
  availabilities,
}: CreateAvailabilitiesGridFormProps) {
  const [selectedSlots, setSelectedSlots] = useState(
    availabilities.map((a) => ({
      day: a.dayOfWeek,
      shiftType: a.shiftType,
    })),
  );

  const handleToggle = (dayOfWeek: DayOfWeek, shiftType: ShiftType) => {
    const slot = selectedSlots.find(
      (slot) => slot.day === dayOfWeek && slot.shiftType === shiftType,
    );

    if (!slot) {
      setSelectedSlots((prevState) => [
        ...prevState,
        { day: dayOfWeek, shiftType },
      ]);
    } else {
      setSelectedSlots((prevState) =>
        prevState.filter(
          (slot) => !(slot.day === dayOfWeek && slot.shiftType === shiftType),
        ),
      );
    }
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const result = await saveAvailabilities({
      slots: selectedSlots.map((slot) => ({
        dayOfWeek: slot.day,
        shiftType: slot.shiftType,
      })),
    });
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("הגשת המשמרות בוצעה בהצלחה!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <table
        dir="rtl"
        className="border-separate border-spacing-1 table-fixed w-full"
      >
        <thead>
          <tr>
            <th scope="col" className="md:w-16"></th>
            {Object.entries(DAY_LABELS).map(([dayType, dayLabel]) => (
              <th key={dayType} scope="col">
                {dayLabel}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(SHIFT_LABELS).map(([shiftType, shiftLabel]) => (
            <tr key={shiftType}>
              <th scope="row">{shiftLabel}</th>
              {Object.values(DayOfWeek).map((dayOfWeek) => {
                const isSelected = selectedSlots.some(
                  (a) => a.shiftType === shiftType && a.day === dayOfWeek,
                );

                return (
                  <Cell
                    key={`${dayOfWeek}-${shiftType}`}
                    dayOfWeek={dayOfWeek}
                    shiftType={shiftType as ShiftType}
                    isSelected={isSelected}
                    onToggle={handleToggle}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="submit" className="font-semibold">
        עדכן משמרות
      </Button>
    </form>
  );
}

interface CellProps {
  dayOfWeek: DayOfWeek;
  shiftType: ShiftType;
  isSelected: boolean;
  onToggle: (dayOfWeek: DayOfWeek, shiftType: ShiftType) => void;
}

function Cell({ dayOfWeek, shiftType, isSelected, onToggle }: CellProps) {
  return (
    <td>
      <button
        type="button"
        onClick={() => onToggle(dayOfWeek, shiftType)}
        className={`flex h-9 w-full cursor-pointer items-center justify-center rounded-md font-semibold transition-colors ${
          isSelected
            ? "bg-green-300 text-green-800 hover:bg-green-400"
            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
        }`}
      >
        {isSelected ? <Check /> : <X />}
      </button>
    </td>
  );
}
