import { Response, Request, PayloadPagination } from "@/utils/types/api";
import { checkProperty, valueFormatData } from "@/utils/formatter";
import axiosWithConfig from "@/utils/apis/axios-with-config";
import { IBook, BookSchema } from "@/utils/types/books";

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

    return response.data as Response<PayloadPagination<IBook[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBook = async (id_book: string) => {
  try {
    const response = await axiosWithConfig.get(`/books/${id_book}`);

    return response.data as Response<IBook>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addBook = async (body: BookSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.post(`/books`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateBook = async (body: BookSchema, id_book: number) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(`/books/${id_book}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteBook = async (id_book: string) => {
  try {
    const response = await axiosWithConfig.delete(`/books/${id_book}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
