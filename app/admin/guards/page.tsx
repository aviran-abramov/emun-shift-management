import {Metadata} from "next";
import {columns, Guard} from "./columns";
import prisma from "@/lib/prisma";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {DataTable} from "@/components/ui/data-table";
import {PageContainer} from "@/components/layout/PageContainer";
import {PageTitle} from "@/components/layout/PageTitle";

export const metadata: Metadata = {title: "שומרים"};

async function getGuards(): Promise<Guard[]> {
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

export default async function GuardsPage() {
    const guards = await getGuards();

    return (
        <PageContainer>
            <div>
                <PageTitle title="רשימת שומרים" count={guards.length} />
                <DataTable columns={columns} data={guards} />
            </div>
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold">הוסף שומר</h2>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                    <form className="flex flex-col gap-2">
                        <Field>
                            <FieldLabel className="px-1">שם פרטי</FieldLabel>
                            <Input />
                        </Field>
                        <Field>
                            <FieldLabel className="px-1">שם משפחה</FieldLabel>
                            <Input />
                        </Field>
                        <Field>
                            <FieldLabel className="px-1">שם משתמש</FieldLabel>
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
        </PageContainer>
    );
}
