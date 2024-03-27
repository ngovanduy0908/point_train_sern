import ApiUtils from "utils/api/api";

export const getListMajor = async () => {
  try {
    const res = await ApiUtils.get(`/major`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getListDepartment = async () => {
  try {
    const res = await ApiUtils.get(`/departments`);
    // console.log("vao day: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
