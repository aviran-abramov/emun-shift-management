import * as z from "zod";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";

export const CreateAvailabilitySchema = z.object({
  day: z.enum(DayOfWeek, { error: "יש לבחור יום" }),
  shiftType: z.enum(ShiftType, { error: "יש לבחור משמרת" }),
  note: z.string().trim().max(500, { error: "הערה ארוכה מדי (עד 500 תווים)" }),
});

export type CreateAvailabilityFormData = z.infer<
  typeof CreateAvailabilitySchema
>;

export const DeleteAvailabilitySchema = z.object({
  id: z.string(),
});

export type DeleteAvailabilityFormData = z.infer<
  typeof DeleteAvailabilitySchema
>;

export const CreateScheduleNoteSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { error: "הכנס לפחות תו אחד" })
    .max(500, { error: "הערה ארוכה מדי (עד 500 תווים)" }),
});

export type CreateScheduleNoteFormData = z.infer<
  typeof CreateScheduleNoteSchema
>;

export const DeleteScheduleNoteSchema = z.object({
  id: z.string(),
});

export type DeleteScheduleNoteFormData = z.infer<
  typeof DeleteScheduleNoteSchema
>;
