import * as z from "zod";

export const CreateGuardSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "יש להזין שם פרטי" })
    .max(50, { error: "שם פרטי ארוך מדי (עד 50 תווים)" }),
  lastName: z
    .string()
    .trim()
    .min(1, { error: "יש להזין שם משפחה" })
    .max(50, { error: "שם משפחה ארוך מדי (עד 50 תווים)" }),
  username: z
    .string()
    .trim()
    .min(3, { error: "שם משתמש חייב להכיל לפחות 3 תווים" })
    .max(30, { error: "שם משתמש ארוך מדי (עד 30 תווים)" }),
  password: z
    .string()
    .min(6, { error: "סיסמה חייבת להכיל לפחות 6 תווים" })
    .max(100, { error: "סיסמה ארוכה מדי (עד 100 תווים)" }),
});

export type CreateGuardFormData = z.infer<typeof CreateGuardSchema>;
