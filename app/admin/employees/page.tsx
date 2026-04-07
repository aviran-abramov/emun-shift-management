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
            </div>
        </main>
    );
}
