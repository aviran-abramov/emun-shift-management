"use client";

import {
  Building,
  BuildingShiftSlotConfig,
} from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface EditBuildingShiftConfigFormProps {
  building: Building & { shiftSlotConfigs: BuildingShiftSlotConfig[] };
}

export default function EditBuildingShiftConfigForm({
  building,
}: EditBuildingShiftConfigFormProps) {
  const [slots, setSlots] = useState(building.shiftSlotConfigs);

  const handleToggle = (id: string) => {
    setSlots((prevState) =>
      prevState.map((slot) =>
        slot.id === id ? { ...slot, isEnabled: !slot.isEnabled } : slot,
      ),
    );
  };

  return (
    <form className="space-y-2">
      <table
        dir="rtl"
        className="border-separate border-spacing-1 table-fixed w-full"
      >
        <thead>
          <tr>
            <th scope="col"></th>
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
              {Object.keys(DAY_LABELS).map((dayOfWeek) => {
                const slot = slots.find(
                  (slot) =>
                    slot.shiftType === shiftType &&
                    slot.dayOfWeek === dayOfWeek,
                );
                if (!slot) return <td key={dayOfWeek} />;

                return (
                  <Cell
                    key={slot.id}
                    id={slot.id}
                    isEnabled={slot.isEnabled}
                    onToggle={handleToggle}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="button">עדכן</Button>
    </form>
  );
}

interface CellProps {
  id: string;
  isEnabled: boolean;
  onToggle: (id: string) => void;
}

function Cell({ id, isEnabled, onToggle }: CellProps) {
  return (
    <td>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className={`flex items-center justify-center h-9 w-full rounded-md font-semibold cursor-pointer transition-colors
          ${
            isEnabled
              ? "bg-green-300 text-green-800 hover:bg-green-400"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-600"
          }`}
      >
        {isEnabled ? <Check /> : <X />}
      </button>
    </td>
  );
}
