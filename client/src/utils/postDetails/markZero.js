import ApiUtils from "utils/api/api";

export const markZero = async (data) => {
  try {
    await ApiUtils.postForm(`/points/mark_zero`, data);
    // return res.data;
  } catch (error) {
    console.log("errorss", error);
  }
};
