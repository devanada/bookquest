import { z } from "zod";

import { IBook } from "@/utils/types/books";
import { IUser } from "@/utils/types/users";

export const borrowSchema = z.object({
  bookId: z
    .number({
      required_error: "Book ID is required",
    })
    .array(),
  borrow_date: z.string({
    required_error: "Borrow date is required",
  }),
});

export const borrowPayload = z.object({
  borrow_date: z.date({
    required_error: "Borrow date is required",
  }),
  due_date: z.date({
    required_error: "Due date is required",
  }),
  return_date: z.date().optional(),
});

export type BorrowSchema = z.infer<typeof borrowSchema>;
export type BorrowPayload = z.infer<typeof borrowPayload>;

export interface IBorrow {
  id: number;
  borrow_date: Date;
  due_date: Date;
  return_date: Date;
  book: IBook;
  user: IUser;
}
