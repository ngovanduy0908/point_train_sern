import ApiUtils from "utils/api/api";

export const getPointTeacherByMa = async (query) => {
  try {
    //   console.log("query: ", query);
    const res = await ApiUtils.get(`/points/point_teacher?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
