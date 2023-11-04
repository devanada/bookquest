import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(1, { message: "Full name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Not a valid email"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    repassword: z
      .string()
      .min(6, { message: "Retype password must be at least 6 characters" }),
    role: z.string().default("user"),
    address: z.string().min(1, { message: "Address is required" }),
    phone_number: z
      .string()
      .min(7, { message: "Phone Number minimum length is 7" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
