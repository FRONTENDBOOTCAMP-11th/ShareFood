import useAxiosInstance from "./useAxiosInstance";

export const isDuplicate = async (
  axiosInstance: ReturnType<typeof useAxiosInstance>,
  type: string,
  value: string
) => {
  try {
    const result = await axiosInstance.get(`/users/${type}?${type}=${value}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};
