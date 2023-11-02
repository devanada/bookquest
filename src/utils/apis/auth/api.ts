import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { Response } from "@/utils/types/api";
import { LoginType, RegisterType } from ".";

interface LoginPayload {
  token: string;
}

export const userLogin = async (body: LoginType) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as Response<LoginPayload>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const userRegister = async (body: RegisterType) => {
  try {
    const response = await axiosWithConfig.post(`/register`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
