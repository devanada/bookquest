export interface Request {
  path?: string;
  query?: string;
  sort?: "new" | "popular";
  filter?: string;
  limit?: string | number;
  page?: string | number;
}

export type Response<T = any> = {
  message: string;
  payload: T;
};

export type PayloadPagination<T = any> = {
  currentPage: number;
  datas: T;
  totalItems: number;
  totalPages: number;
};

export interface Meta {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
