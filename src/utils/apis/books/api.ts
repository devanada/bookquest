import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { Response, Request, PayloadPagination } from "@/utils/types/api";
import { Book } from ".";

export const getBooks = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query ? `/books?${query}` : "/books";

    const response = await axiosWithConfig.get(url);

    return response.data as Response<PayloadPagination<Book[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBook = async (id_book: string) => {
  try {
    const response = await axiosWithConfig.get(`/books/${id_book}`);

    return response.data as Response<Book>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
