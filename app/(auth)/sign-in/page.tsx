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
import Image from "next/image";
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {title: "התחברות"};

export default function SignInPage() {
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
                        <h2 className="text-2xl font-bold">התחברות</h2>
                        <CardDescription>מערכת לניהול משמרות</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3">
                        <form className="flex flex-col gap-2">
                            <Field>
                                <FieldLabel className="px-1">
                                    שם משתמש / אימייל
                                </FieldLabel>
                                <Input placeholder="yossicoh123" />
                            </Field>

                            <Field>
                                <div className="flex items-center justify-between px-1">
                                    <FieldLabel>סיסמה</FieldLabel>
                                    {/* TODO: Create forgot-password page */}
                                    <Link
                                        href="/forgot-password"
                                        className="text-blue-500 underline"
                                    >
                                        שכחתי סיסמה
                                    </Link>
                                </div>
                                <Input placeholder="123456" />
                            </Field>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col items-center">
                        <Button className="self-stretch">התחבר</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
