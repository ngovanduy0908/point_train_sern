import ApiUtils from "utils/api/api";

export const getListMajorByMaKhoa = async (params) => {
  try {
    const res = await ApiUtils.get(`/major/${params}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
