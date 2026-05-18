"use client";

import { saveAvailabilityNote } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DAY_LABELS, SHIFT_LABELS } from "@/lib/labels";
import {
  SaveAvailabilityNoteFormData,
  SaveAvailabilityNoteSchema,
} from "@/lib/validators/availability";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface SaveAvailabilityNoteFormProps {
  onTrigger: () => void;
}

export default function SaveAvailabilityNoteForm({
  onTrigger,
}: SaveAvailabilityNoteFormProps) {
  const form = useForm<SaveAvailabilityNoteFormData>({
    resolver: zodResolver(SaveAvailabilityNoteSchema),
    defaultValues: {
      shiftNote: "",
    },
  });

  const onSubmit = async (data: SaveAvailabilityNoteFormData) => {
    const result = await saveAvailabilityNote(data);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("ההערה עודכנה בהצלחה!");
    onTrigger();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-2 border rounded-lg p-3"
    >
      <FieldGroup className="flex flex-col gap-2">
        <Controller
          name="dayOfWeek"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>יום</FieldLabel>
              <Select
                dir="rtl"
                value={field.value}
                onValueChange={field.onChange}
              >
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
          )}
        />

        <Controller
          name="shiftType"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>סוג משמרת</FieldLabel>
              <Select
                dir="rtl"
                value={field.value}
                onValueChange={field.onChange}
              >
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
          )}
        />

        <Controller
          name="shiftNote"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>הערה</FieldLabel>
              <Textarea {...field} />
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex items-center gap-1">
        <Button type="submit">הוסף</Button>
        <Button type="button" variant="outline" onClick={onTrigger}>
          סגור
        </Button>
      </div>
    </form>
  );
}
