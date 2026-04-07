import {Metadata} from "next";
import {columns, Employee} from "./columns";
import {DataTable} from "./data-table";
import prisma from "@/lib/prisma";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "שומרים",
};

async function getData(): Promise<Employee[]> {
    return await prisma.user.findMany({
        select: {
            id: true,
            isActive: true,
            firstName: true,
            lastName: true,
            username: true,
            createdAt: true,
        },
    });
}

export default async function EmployeesPage() {
    const data = await getData();

    return (
        <main className="min-h-screen">
            <div className="p-6 flex flex-col gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-2 mr-2">
                        רשימת שומרים
                    </h2>
                    <DataTable columns={columns} data={data} />
                </div>
                <Card className="w-full max-w-sm shadow-md">
                    <CardHeader className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold">הוסף שומר</h2>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3">
                        <form className="flex flex-col gap-2">
                            <Field>
                                <FieldLabel className="px-1">
                                    שם פרטי
                                </FieldLabel>
                                <Input />
                            </Field>
                            <Field>
                                <FieldLabel className="px-1">
                                    שם משפחה
                                </FieldLabel>
                                <Input />
                            </Field>
                            <Field>
                                <FieldLabel className="px-1">
                                    שם משתמש
                                </FieldLabel>
                                <Input />
                            </Field>
                            <Field>
                                <FieldLabel className="px-1">סיסמה</FieldLabel>
                                <Input />
                            </Field>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col items-center gap-2">
                        <Button className="self-stretch">הוסף</Button>
                        <Button
                            variant={"outline"}
                            className="self-stretch border-primary"
                        >
                            איפוס טופס
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
