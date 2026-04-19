"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGuard } from "@/app/admin/guards/actions";
import { CreateGuardFormData, CreateGuardSchema } from "@/lib/validators/guard";

interface CreateGuardFormProps {
  onSuccess: () => void;
}

export function CreateGuardForm({ onSuccess }: CreateGuardFormProps) {
  const form = useForm<CreateGuardFormData>({
    resolver: zodResolver(CreateGuardSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateGuardFormData) => {
    const result = await createGuard(data);
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
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="px-1">
                שם פרטי
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
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="px-1">
                שם משפחה
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
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="px-1">
                שם משתמש
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
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="px-1">
                סיסמה
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
