import * as z from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const bookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  feature: z.boolean().optional(),
  author: z.string().min(1, { message: "Author is required" }),
  isbn: z
    .string()
    .regex(/^(978|979)/u, "The ISBN format is invalid")
    .min(13, { message: "ISBN minimum length is 13" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  cover_image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    )
    .optional()
    .or(z.literal("")),
});

export type BookSchema = z.infer<typeof bookSchema>;
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  cover_image: string;
}
