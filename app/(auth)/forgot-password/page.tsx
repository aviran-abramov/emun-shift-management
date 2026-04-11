import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {title: "שכחתי סיסמה"};

export default function ForgotPasswordPage() {
    return (
        <Card className="w-full max-w-sm shadow-md">
            <CardHeader className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">שכחתי סיסמה</h2>
                <CardDescription className="text-center">
                    הזן את כתובת האימייל שלך ונשלח לך קישור לאיפוס הסיסמה.
                </CardDescription>
            </CardHeader>

            <form className="flex flex-col gap-4">
                <CardContent className="flex flex-col">
                    <Field>
                        <FieldLabel className="px-1">כתובת אימייל</FieldLabel>
                        <Input placeholder="yossicoh123@gmail.com" />
                    </Field>
                </CardContent>

                <CardFooter className="flex flex-col items-center gap-2">
                    <Button type="submit" className="self-stretch">
                        איפוס סיסמה
                    </Button>
                    <Button
                        asChild
                        variant={"outline"}
                        className="self-stretch border-primary"
                    >
                        <Link href="/sign-in">חזור לעמוד התחברות</Link>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
