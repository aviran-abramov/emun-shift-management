"use client";

import { SectionTitle } from "@/components/layout/section-title";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
import { useState } from "react";

export function AvailabilityNotes() {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen((prevState) => !prevState);

  return (
    <section className="max-w-sm space-y-2">
      <SectionTitle>הערות למשמרות ספציפיות</SectionTitle>
      {!isOpen ? (
        <Button type="button" onClick={handleTrigger}>
          <span className="text-xl font-bold">+</span>
          <span>הוסף הערה</span>
        </Button>
      ) : (
        <form className="space-y-2 border rounded-lg p-3">
          <FieldGroup className="flex flex-col gap-2">
            <Field>
              <FieldLabel>יום</FieldLabel>
              <Select dir="rtl">
                <SelectTrigger>
                  <SelectValue placeholder="בחר יום"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>יום</SelectLabel>
                    {Object.entries(DAY_LABELS).map(([dayType, dayLabel]) => (
                      <SelectItem key={dayType} value={dayType}>
                        {dayLabel}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>סוג משמרת</FieldLabel>
              <Select dir="rtl">
                <SelectTrigger>
                  <SelectValue placeholder="בחר סוג משמרת"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>סוג משמרת</SelectLabel>
                    {Object.entries(SHIFT_LABELS).map(
                      ([shiftType, shiftLabel]) => (
                        <SelectItem key={shiftType} value={shiftType}>
                          {shiftLabel}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>הערה</FieldLabel>
              <Textarea />
            </Field>
          </FieldGroup>

          <div className="flex items-center gap-1">
            <Button type="submit">הוסף</Button>
            <Button type="button" variant="outline" onClick={handleTrigger}>
              סגור
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
