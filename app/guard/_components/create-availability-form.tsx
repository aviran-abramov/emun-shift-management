"use client";

import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";
import { createAvailability } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateAvailabilityFormData,
  CreateAvailabilitySchema,
} from "@/lib/validators/availability";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const DAY_LABELS: Record<DayOfWeek, string> = {
  SUNDAY: "ראשון",
  MONDAY: "שני",
  TUESDAY: "שלישי",
  WEDNESDAY: "רביעי",
  THURSDAY: "חמישי",
  FRIDAY: "שישי",
  SATURDAY: "שבת",
};

const SHIFT_LABELS: Record<ShiftType, string> = {
  MORNING: "בוקר",
  EVENING: "ערב",
  NIGHT: "לילה",
};

export default function CreateAvailabilityForm() {
  const form = useForm<CreateAvailabilityFormData>({
    resolver: zodResolver(CreateAvailabilitySchema),
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = async (data: CreateAvailabilityFormData) => {
    const result = await createAvailability(data);
    if (result.success) {
      form.reset();
    } else {
      form.setError("root", { message: result.error });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="day"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="max-w-28" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>יום</FieldLabel>
              <Select
                dir="rtl"
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="בחר" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(DayOfWeek).map((day) => (
                      <SelectItem key={day} value={day}>
                        {DAY_LABELS[day]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="shiftType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="max-w-28" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>משמרת</FieldLabel>
              <Select
                dir="rtl"
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="בחר" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(ShiftType).map((shift) => (
                      <SelectItem key={shift} value={shift}>
                        {SHIFT_LABELS[shift]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="note"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>הערות למשמרת</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="self-baseline"
        >
          הוסף משמרת
        </Button>
      </FieldGroup>
    </form>
  );
}
