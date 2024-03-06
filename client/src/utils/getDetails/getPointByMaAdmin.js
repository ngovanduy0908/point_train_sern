import ApiUtils from "utils/api/api";

export const getPointByMaAdmin = async (query) => {
  try {
    const res = await ApiUtils.get(`/points/point_by_ma?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
