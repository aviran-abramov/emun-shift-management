"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreateBuildingFormData } from "@/lib/validators/building";
import { Controller, useForm } from "react-hook-form";

export function CreateBuildingForm() {
  const form = useForm<CreateBuildingFormData>({
    defaultValues: {
      name: "",
      street: "",
      city: "",
    },
  });

  const onSubmit = (data: CreateBuildingFormData) => console.log(data);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name} className="px-1">
                שם הבניין
              </FieldLabel>
              <Input {...field} type="text" id={field.name} />
            </Field>
          )}
        />

        <Controller
          name="street"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name} className="px-1">
                רחוב
              </FieldLabel>
              <Input {...field} type="text" id={field.name} />
            </Field>
          )}
        />

        <Controller
          name="city"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name} className="px-1">
                עיר
              </FieldLabel>
              <Input {...field} type="text" id={field.name} />
            </Field>
          )}
        />
      </div>

      <div className="flex flex-col items-center border-t py-4 gap-2">
        <Button type="submit" className="self-stretch">
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
