import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "שכחתי סיסמה"
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-radial from-[#FFAB4F] to-[#D95E00]">
      <div className="w-full md:max-w-lg flex px-4 flex-col items-center gap-16 mb-16 md:mb-20 md:gap-20">
        <Image
          src="/emun-logo.png"
          alt="Emun logo"
          height={70}
          width={206}
        />

        <Card className="w-full max-w-sm shadow-md">
          <CardHeader className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">שכחתי סיסמה</h2>
            <CardDescription className="text-center">הזן את כתובת האימייל שלך ונשלח לך קישור לאיפוס הסיסמה.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <form className="flex flex-col gap-2">
              <Field>
                <FieldLabel className="px-1">כתובת אימייל</FieldLabel>
                <Input placeholder="yossicoh123@gmail.com" />
              </Field>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <Button className="self-stretch">איפוס סיסמה</Button>
            <Button asChild variant={"outline"} className="self-stretch border-primary">
              <Link href="/sign-in">חזור לעמוד התחברות</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
