import ApiUtils from "utils/api/api";

export const getListPointStudentAdmin = async (params) => {
  try {
    const res = await ApiUtils.get(`/point_admin/${params}`);
    // console.log("res ne: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
