"use server";

import prisma from "@/lib/prisma";
import { CreateBuildingSchema } from "@/lib/validators/building";
import { revalidatePath } from "next/cache";
import * as z from "zod";

type ActionResult = { success: true } | { success: false; error: string };

const createErrorMessage = (issues: z.core.$ZodIssueBase[]): string => {
  let errorMessage = "";

  issues.forEach((issue) => {
    errorMessage += `${issue.path}: ${issue.message}`;
  });

  return errorMessage;
};

export async function createBuilding(data: unknown): Promise<ActionResult> {
  const result = CreateBuildingSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: createErrorMessage(result.error.issues),
    };
  }

  try {
    await prisma.building.create({ data: result.data });
  } catch (error) {
    return { success: false, error: "הוספת הבניין נכשלה" };
  }

  revalidatePath("/admin/buildings");
  return {
    success: true,
  };
}
