import * as z from "zod";

export const CreateBuildingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Building name is required." })
    .max(100, {
      error: "Building name must be 100 characters or less.",
    }),
  street: z
    .string()
    .trim()
    .min(1, { error: "Street address is required." })
    .max(100, {
      error: "Street address must be 100 characters or less.",
    }),
  city: z.string().trim().min(1, { error: "City is required." }).max(100, {
    error: "City must be 100 characters or less.",
  }),
});

export type CreateBuildingFormData = z.infer<typeof CreateBuildingSchema>;
