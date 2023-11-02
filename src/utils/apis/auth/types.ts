import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  password: z.string({ required_error: "Password is required" }),
});

export const registerSchema = z
  .object({
    full_name: z.string({ required_error: "Full name is required" }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password minimum length is 6" }),
    repassword: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Retype password minimum length is 6" }),
    role: z.string().default("user"),
    address: z.string({ required_error: "Address is required" }),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(7, { message: "Phone Number minimum length is 7" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
