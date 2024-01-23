import ApiUtils from "utils/api/api";

export const getListClassByMaGV = async (query) => {
  try {
    const res = await ApiUtils.get(`/class/listClassByMaGV?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
