import ApiUtils from "utils/api/api";

export const getManyInfoBySV = async (query) => {
  try {
    const res = await ApiUtils.get(`/students/getManyInfo?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
