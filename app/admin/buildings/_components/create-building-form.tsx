"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  CreateBuildingFormData,
  CreateBuildingSchema,
} from "@/lib/validators/building";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBuilding } from "@/app/admin/buildings/actions";

interface CreateBuildingFormProps {
  onSuccess: () => void;
}

export function CreateBuildingForm({ onSuccess }: CreateBuildingFormProps) {
  const form = useForm<CreateBuildingFormData>({
    resolver: zodResolver(CreateBuildingSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
    },
  });

  const onSubmit = async (data: CreateBuildingFormData) => {
    const result = await createBuilding(data);
    if (result.success) {
      form.reset();
      onSuccess();
    } else {
      form.setError("root", { message: result.error });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="px-1">
                שם הבניין
              </FieldLabel>
              <Input
                {...field}
                type="text"
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="street"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="px-1">
                רחוב
              </FieldLabel>
              <Input
                {...field}
                type="text"
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="px-1">
                עיר
              </FieldLabel>
              <Input
                {...field}
                type="text"
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {form.formState.errors.root && (
        <p className="text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="flex flex-col items-center border-t py-4 gap-2">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="self-stretch"
        >
          הוסף
        </Button>

        <Button
          type="button"
          variant="outline"
          className="self-stretch border-primary"
          onClick={() => form.reset()}
        >
          איפוס טופס
        </Button>
      </div>
    </form>
  );
}
