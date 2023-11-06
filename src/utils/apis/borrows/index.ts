import {
  getBorrows,
  getDetailBook,
  postBorrow,
  updateBorrow,
  deleteBorrow,
} from "./api";
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
  borrowSchema,
  borrowPayload,
};
export type { Borrow, BorrowSchema, BorrowPayload };
