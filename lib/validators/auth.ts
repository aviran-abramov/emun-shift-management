import * as z from "zod";

export const SignInSchema = z.object({
  username: z.string().trim().min(1, { error: "יש להזין שם משתמש" }),
  password: z.string().min(1, { error: "יש להזין סיסמה" }),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
