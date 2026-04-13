"use client";

import { Building } from "@/app/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Building>[] = [
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
    accessorKey: "name",
    header: "שם הבניין",
  },
  {
    accessorKey: "street",
    header: "רחוב",
  },
  {
    accessorKey: "city",
    header: "עיר",
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
