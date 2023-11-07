import ApiUtils from "utils/api/api";

export const getStudentsNoMark = async (query) => {
  try {
    const res = await ApiUtils.get(`/points/studentNoMark?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
