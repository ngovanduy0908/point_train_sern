import ApiUtils from "utils/api/api";

export const getNameDepartmentByMa = async (params) => {
  try {
    const res = await ApiUtils.get(`/departments/${params}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
