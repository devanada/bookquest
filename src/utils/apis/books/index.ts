import {
  getBooks,
  getDetailBook,
  addBook,
  updateBook,
  deleteBook,
} from "./api";
import { sampleBooks } from "./sample-data";
import { bookSchema, Book, BookSchema } from "./types";

export {
  getBooks,
  getDetailBook,
  addBook,
  updateBook,
  deleteBook,
  bookSchema,
  sampleBooks,
};
export type { Book, BookSchema };
