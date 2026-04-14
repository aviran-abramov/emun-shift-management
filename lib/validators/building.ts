import * as z from "zod";

export const CreateBuildingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "יש להזין שם בניין" })
    .max(100, { error: "שם הבניין ארוך מדי (עד 100 תווים)" }),
  street: z
    .string()
    .trim()
    .min(1, { error: "יש להזין רחוב" })
    .max(100, { error: "שם הרחוב ארוך מדי (עד 100 תווים)" }),
  city: z
    .string()
    .trim()
    .min(1, { error: "יש להזין עיר" })
    .max(100, { error: "שם העיר ארוך מדי (עד 100 תווים)" }),
});

export type CreateBuildingFormData = z.infer<typeof CreateBuildingSchema>;
