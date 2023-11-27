import {
  getBooks,
  getDetailBook,
  addBook,
  updateBook,
  deleteBook,
} from "./api";
import { bookSchema, Book, BookSchema } from "./types";
import { sampleBooks, sampleFeaturedBooks } from "./sample-data";

export {
  getBooks,
  getDetailBook,
  addBook,
  updateBook,
  deleteBook,
  bookSchema,
  sampleBooks,
  sampleFeaturedBooks,
};
export type { Book, BookSchema };
