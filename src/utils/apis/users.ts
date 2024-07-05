import { checkProperty, valueFormatData } from "@/utils/formatter";
import { IUser, ProfileSchema } from "@/utils/types/users";
import axiosWithConfig from "@/utils/apis/axios-with-config";
import { Response } from "@/utils/types/api";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/users`);

    return response.data as Response<IUser>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateProfile = async (body: ProfileSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(`/users`, formData);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete(`/users`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
