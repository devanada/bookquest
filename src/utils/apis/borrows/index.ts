import {
  getBorrows,
  getDetailBook,
  postBorrow,
  updateBorrow,
  deleteBorrow,
} from "./api";
import { sampleBooks } from "./sample-data";
import {
  borrowSchema,
  borrowPayload,
  Borrow,
  BorrowSchema,
  BorrowPayload,
} from "./types";

export {
  getBorrows,
  getDetailBook,
  postBorrow,
  updateBorrow,
  deleteBorrow,
  sampleBooks,
  borrowSchema,
  borrowPayload,
};
export type { Borrow, BorrowSchema, BorrowPayload };
