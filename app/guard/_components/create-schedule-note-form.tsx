"use client";

import { createScheduleNote } from "@/app/guard/availability/actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateScheduleNoteFormData,
  CreateScheduleNoteSchema,
} from "@/lib/validators/availability";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export function CreateScheduleNoteForm() {
  const form = useForm<CreateScheduleNoteFormData>({
    resolver: zodResolver(CreateScheduleNoteSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: CreateScheduleNoteFormData) => {
    const result = await createScheduleNote(data);
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
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>הוסף הערות</FieldLabel>
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
          הוסף
        </Button>
      </FieldGroup>
    </form>
  );
}
