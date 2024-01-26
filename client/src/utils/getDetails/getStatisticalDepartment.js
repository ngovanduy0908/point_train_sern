import ApiUtils from "utils/api/api";

export const statisticalKhoa = async (query) => {
  try {
    const res = await ApiUtils.get(`/departments/statistical?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
