"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, SignInSchema } from "@/lib/validators/auth";

export default function SignInForm() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {};

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <CardContent className="flex flex-col gap-2">
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
                placeholder="yossicoh123"
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
              <div className="flex items-center justify-between px-1">
                <FieldLabel htmlFor={field.name}>סיסמה</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-blue-500 underline"
                >
                  שכחתי סיסמה
                </Link>
              </div>
              <Input
                {...field}
                type="password"
                id={field.name}
                placeholder="123456"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>

      <CardFooter className="flex flex-col items-center">
        <Button type="submit" className="self-stretch">
          התחבר
        </Button>
      </CardFooter>
    </form>
  );
}
