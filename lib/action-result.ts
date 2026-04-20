import * as z from "zod";

export type ActionResult =
  | { success: true }
  | { success: false; error: string };

export const createErrorMessage = (issues: z.core.$ZodIssueBase[]): string => {
  let errorMessage = "";

  issues.forEach((issue) => {
    errorMessage += `${issue.path}: ${issue.message}`;
  });

  return errorMessage;
};
