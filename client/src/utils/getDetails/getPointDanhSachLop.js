import ApiUtils from "utils/api/api";

export const getPointStudentByMaLopAndMaHK = async (query) => {
  try {
    const res = await ApiUtils.get(`/points/get_point_ds_lop?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
