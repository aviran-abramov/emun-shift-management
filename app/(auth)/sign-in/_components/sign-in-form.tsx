"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";

export default function SignInForm() {
  return (
    <form className="flex flex-col gap-4">
      <CardContent className="flex flex-col gap-2">
        <Field>
          <FieldLabel htmlFor="identifier" className="px-1">
            שם משתמש / אימייל
          </FieldLabel>
          <Input type="text" id="identifier" placeholder="yossicoh123" />
        </Field>

        <Field>
          <div className="flex items-center justify-between px-1">
            <FieldLabel htmlFor="password">סיסמה</FieldLabel>

            <Link href="/forgot-password" className="text-blue-500 underline">
              שכחתי סיסמה
            </Link>
          </div>
          <Input type="password" id="password" placeholder="123456" />
        </Field>
      </CardContent>

      <CardFooter className="flex flex-col items-center">
        <Button type="submit" className="self-stretch">
          התחבר
        </Button>
      </CardFooter>
    </form>
  );
}
