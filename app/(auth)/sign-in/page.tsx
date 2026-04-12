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

export const metadata: Metadata = {title: "התחברות"};

export default function SignInPage() {
    return (
        <Card className="w-full max-w-sm shadow-md">
            <CardHeader className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">התחברות</h2>
                <CardDescription>מערכת לניהול משמרות</CardDescription>
            </CardHeader>

            <form className="flex flex-col gap-4">
                <CardContent className="flex flex-col gap-2">
                    <Field>
                        <FieldLabel htmlFor="identifier" className="px-1">
                            שם משתמש / אימייל
                        </FieldLabel>
                        <Input id="identifier" placeholder="yossicoh123" />
                    </Field>

                    <Field>
                        <div className="flex items-center justify-between px-1">
                            <FieldLabel htmlFor="password">סיסמה</FieldLabel>

                            <Link
                                href="/forgot-password"
                                className="text-blue-500 underline"
                            >
                                שכחתי סיסמה
                            </Link>
                        </div>
                        <Input id="password" placeholder="123456" />
                    </Field>
                </CardContent>

                <CardFooter className="flex flex-col items-center">
                    <Button type="submit" className="self-stretch">
                        התחבר
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
