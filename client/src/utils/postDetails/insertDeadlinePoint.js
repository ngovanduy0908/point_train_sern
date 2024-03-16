import ApiUtils from "utils/api/api";

export const insertDeadlinePoint = async (data) => {
  try {
    await ApiUtils.postForm(`/deadlines_point`, data);
    // return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};
