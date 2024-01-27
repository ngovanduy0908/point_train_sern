import ApiUtils from "utils/api/api";

export const getListCourse = async () => {
  try {
    const res = await ApiUtils.get(`/courses`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
