import * as z from "zod";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";

export const SaveAvailabilitiesSchema = z.object({
  slots: z.array(
    z.object({
      dayOfWeek: z.enum(DayOfWeek, { error: "יש לבחור יום" }),
      shiftType: z.enum(ShiftType, { error: "יש לבחור משמרת" }),
    }),
  ),
});

export type SaveAvailabilitiesFormData = z.infer<
  typeof SaveAvailabilitiesSchema
>;

export const DeleteAvailabilitySchema = z.object({
  id: z.string(),
});

export type DeleteAvailabilityFormData = z.infer<
  typeof DeleteAvailabilitySchema
>;

export const CreateWeeklyNoteSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { error: "הכנס לפחות תו אחד" })
    .max(500, { error: "הערה ארוכה מדי (עד 500 תווים)" }),
});

export type CreateWeeklyNoteFormData = z.infer<typeof CreateWeeklyNoteSchema>;

export const DeleteWeeklyNoteSchema = z.object({
  id: z.string(),
});

export type DeleteWeeklyNoteFormData = z.infer<typeof DeleteWeeklyNoteSchema>;
