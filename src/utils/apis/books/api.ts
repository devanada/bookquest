import { Request } from "@/utils/types/api";
import { sampleBooks, Book } from ".";

export const getBooks = async (params: Request) => {
  return new Promise<Book[]>((resolve) => {
    setTimeout(() => {
      resolve(sampleBooks);
    }, 1000);
  });
};

export const getDetailBook = async (params: Request) => {
  return new Promise<Book>((resolve, reject) => {
    const findById = sampleBooks.find((book) => book.id == +params.path!);

    setTimeout(() => {
      if (findById) {
        resolve(findById);
      } else {
        reject("Cannot find the book");
      }
    }, 1000);
  });
};
