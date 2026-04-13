import {Metadata} from "next";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import {Card, CardHeader} from "@/components/ui/card";
import {Building} from "@/app/generated/prisma/client";
import {DataTable} from "@/components/ui/data-table";
import {PageContainer} from "@/components/layout/page-container";
import {PageTitle} from "@/components/layout/page-title";
import {CreateBuildingForm} from "@/components/buildings/create-form";

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
                <Card className="w-full max-w-sm shadow-md pb-0">
                    <CardHeader className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold">הוסף בניין</h2>
                    </CardHeader>

                    <CreateBuildingForm />
                </Card>
            </section>
        </PageContainer>
    );
}
