import ApiUtils from "utils/api/api";

export const getListSemester = async () => {
  try {
    const res = await ApiUtils.get(`/semesters`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
