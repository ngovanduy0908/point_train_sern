import ApiUtils from "utils/api/api";

export const insertDeadlineAdmin = async (params, data) => {
  try {
    const res = await ApiUtils.postForm(`/deadlines_admin/${params}`, data);
    // return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};
