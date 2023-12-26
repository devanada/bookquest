import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { checkProperty, valueFormatData } from "@/utils/formatter";
import { Response } from "@/utils/types/api";
import { ProfileType, ProfileUpdateType } from ".";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/users`);

    return response.data as Response<ProfileType>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateProfile = async (body: ProfileUpdateType) => {
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
