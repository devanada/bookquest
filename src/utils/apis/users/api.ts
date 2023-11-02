import axiosWithConfig from "@/utils/apis/axiosWithConfig";
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
    const response = await axiosWithConfig.put(`/users`, body);

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
