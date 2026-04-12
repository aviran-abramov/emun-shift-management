import {Metadata} from "next";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Building} from "@/app/generated/prisma/client";
import {DataTable} from "@/components/ui/data-table";
import {PageContainer} from "@/components/layout/page-container";
import {PageTitle} from "@/components/layout/page-title";

export const metadata: Metadata = {title: "בניינים"};

async function getBuildings(): Promise<Building[]> {
    return await prisma.building.findMany();
}

export default async function BuildingsPage() {
    const buildings = await getBuildings();

    return (
        <PageContainer>
            <section>
                <PageTitle title="רשימת בניינים" count={buildings.length} />
                <DataTable columns={columns} data={buildings} />
            </section>

            <section>
                <Card className="w-full max-w-sm shadow-md">
                    <CardHeader className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold">הוסף בניין</h2>
                    </CardHeader>

                    <form className="flex flex-col gap-4">
                        <CardContent className="flex flex-col">
                            <Field>
                                <FieldLabel htmlFor="name" className="px-1">
                                    שם הבניין
                                </FieldLabel>
                                <Input type="text" id="name" />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="street" className="px-1">
                                    רחוב
                                </FieldLabel>
                                <Input type="text" id="street" />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="city" className="px-1">
                                    עיר
                                </FieldLabel>
                                <Input type="text" id="city" />
                            </Field>
                        </CardContent>

                        <CardFooter className="flex flex-col items-center gap-2">
                            <Button type="submit" className="self-stretch">
                                הוסף
                            </Button>
                            <Button
                                type="reset"
                                variant={"outline"}
                                className="self-stretch border-primary"
                            >
                                איפוס טופס
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </section>
        </PageContainer>
    );
}
