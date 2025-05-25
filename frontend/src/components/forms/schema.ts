import * as z from "zod";

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\+]?[\d\s\(\)\-]{10,}$/,
      "Please enter a valid phone number (minimum 10 digits)"
    )
    .transform((val: string) => val.replace(/\s+/g, " ").trim()),
});

export type PhoneFormData = z.infer<typeof phoneSchema>;
