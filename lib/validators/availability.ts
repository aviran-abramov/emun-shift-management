import * as z from "zod";
import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";

export const CreateAvailabilitySchema = z.object({
  day: z.enum(DayOfWeek, { error: "יש לבחור יום" }),
  shiftType: z.enum(ShiftType, { error: "יש לבחור משמרת" }),
  note: z
    .string()
    .trim()
    .max(500, { error: "הערה ארוכה מדי (עד 500 תווים)" }),
});

export type CreateAvailabilityFormData = z.infer<
  typeof CreateAvailabilitySchema
>;
