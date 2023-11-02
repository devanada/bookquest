export interface Request {
  path?: string;
  query?: string;
  sort?: string;
  filter?: string;
}

export type Response<T = undefined> = {
  message: string;
  payload?: T;
};
