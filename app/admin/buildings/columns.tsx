"use client";

import { Building } from "@/app/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Building>[] = [
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          <ArrowUpDown className="h-4 w-4" />
          סטטוס
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          <ArrowUpDown className="h-4 w-4" />
          שם הבניין
        </Button>
      );
    },
  },
  {
    accessorKey: "street",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          <ArrowUpDown className="h-4 w-4" />
          רחוב
        </Button>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          <ArrowUpDown className="h-4 w-4" />
          עיר
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          <ArrowUpDown className="h-4 w-4" />
          תאריך הוספה
        </Button>
      );
    },
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
];
