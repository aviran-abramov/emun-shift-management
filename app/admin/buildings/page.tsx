import {Metadata} from "next";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Building} from "@/app/generated/prisma/client";
import {DataTable} from "@/components/ui/data-table";
import {PageContainer} from "@/components/layout/PageContainer";

export const metadata: Metadata = {title: "בניינים"};

async function getBuildings(): Promise<Building[]> {
    return await prisma.building.findMany();
}

export default async function BuildingsPage() {
    const buildings = await getBuildings();

    return (
        <PageContainer>
            <div>
                <h2 className="text-2xl font-bold mb-2 mr-2">
                    רשימת בניינים ({buildings.length})
                </h2>
                <DataTable columns={columns} data={buildings} />
            </div>
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold">הוסף בניין</h2>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                    <form className="flex flex-col gap-2">
                        <Field>
                            <FieldLabel className="px-1">שם הבניין</FieldLabel>
                            <Input />
                        </Field>
                        <Field>
                            <FieldLabel className="px-1">רחוב</FieldLabel>
                            <Input />
                        </Field>
                        <Field>
                            <FieldLabel className="px-1">עיר</FieldLabel>
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
