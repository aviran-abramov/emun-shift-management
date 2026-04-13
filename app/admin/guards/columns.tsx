"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Guard = {
  id: string;
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
];
