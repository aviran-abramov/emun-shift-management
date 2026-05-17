"use client";

import { Building } from "@/app/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Guard = {
  id: string;
  buildings: Building[];
  isActive: boolean;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
};

export const columns: ColumnDef<Guard>[] = [
  {
    accessorKey: "isActive",
    header: "סטטוס",
    cell: ({ row }) =>
      row.getValue("isActive") ? (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          פעיל
        </Badge>
      ) : (
        <Badge variant="secondary">מושבת</Badge>
      ),
  },
  {
    accessorKey: "firstName",
    header: "שם פרטי",
  },
  {
    accessorKey: "lastName",
    header: "שם משפחה",
  },
  {
    accessorKey: "username",
    header: "שם משתמש",
  },
  {
    accessorKey: "createdAt",
    header: "תאריך הוספה",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
  {
    id: "actions",
    header: "פעולות",
    size: 140,
    cell: ({ row }) => (
      <Button asChild variant="outline" size="sm">
        <Link href={`/admin/guards/${row.original.id}/buildings`}>
          <span>נהל בניינים</span>
          <span>({row.original.buildings.length})</span>
        </Link>
      </Button>
    ),
  },
];
