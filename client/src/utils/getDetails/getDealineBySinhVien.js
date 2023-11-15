import ApiUtils from "utils/api/api";

export const getDeadlineBySinhVien = async (params) => {
  try {
    const res = await ApiUtils.get(`/deadlines/deadlineMaLop/${params}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
