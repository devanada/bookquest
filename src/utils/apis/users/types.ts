import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const profileUpdateSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  full_name: z.string().min(1, { message: "Full name is required" }),
  password: z.string().optional(),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  profile_picture: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    )
    .optional(),
});

export type RoleType = "user" | "admin";

export interface ProfileType {
  id: number;
  full_name: string;
  email: string;
  role: RoleType;
  profile_picture: string;
  address: string;
  phone_number: string;
}
export type ProfileUpdateType = z.infer<typeof profileUpdateSchema>;
