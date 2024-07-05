import { LoginSchema, RegisterSchema } from "@/utils/types/auth";
import axiosWithConfig from "@/utils/apis/axios-with-config";
import { Response } from "@/utils/types/api";

interface LoginPayload {
  token: string;
}

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as Response<LoginPayload>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const userRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`/register`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
