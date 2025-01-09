import { axiosInstance } from "./axiosInstance";

export const isDuplicate = async (type: string, value: string) => {
  try {
    const result = await axiosInstance.get(`/users/${type}?${type}=${value}`);
    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
  }
};
