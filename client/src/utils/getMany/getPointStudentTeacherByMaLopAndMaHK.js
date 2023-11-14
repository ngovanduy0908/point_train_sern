import ApiUtils from "utils/api/api";

export const getPointStudentTeacherByMaLopAndMaHK = async (query) => {
  try {
    const res = await ApiUtils.get(`/points/get_point_teacher?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
