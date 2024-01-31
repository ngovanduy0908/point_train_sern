import ApiUtils from "utils/api/api";

export const getPass = async (query) => {
  try {
    const res = await ApiUtils.get(`/students/pass?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
