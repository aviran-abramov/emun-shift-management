import {Metadata} from "next";
import {columns} from "./columns";
import prisma from "@/lib/prisma";
import {Building} from "@/app/generated/prisma/client";
import {DataTable} from "@/components/ui/data-table";
import {PageContainer} from "@/components/layout/page-container";
import {PageTitle} from "@/components/layout/page-title";
import {CreateBuildingForm} from "@/components/buildings/create-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {title: "בניינים"};

async function getBuildings(): Promise<Building[]> {
    return await prisma.building.findMany();
}

export default async function BuildingsPage() {
    const buildings = await getBuildings();

    return (
        <PageContainer>
            <section className="flex flex-col gap-3">
                <PageTitle title="רשימת בניינים" count={buildings.length} />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="self-start">
                            <span className="text-xl">+</span>
                            <span>הוסף בניין</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>הוסף בניין</DialogTitle>
                            <DialogDescription>
                                מלא את פרטי הבניין החדש
                            </DialogDescription>
                        </DialogHeader>

                        <CreateBuildingForm />
                    </DialogContent>
                </Dialog>
                <DataTable columns={columns} data={buildings} />
            </section>
        </PageContainer>
    );
}
