import ApiUtils from "utils/api/api";

export const getListPointByMaSv = async (query) => {
  try {
    const res = await ApiUtils.get(`/points/list_point?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
