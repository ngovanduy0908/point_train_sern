import ApiUtils from "utils/api/api";

export const insertOrUpdatePointTeacher = async (query, data) => {
  try {
    const res = await ApiUtils.postForm(
      `/points/insert_or_update_teacher?${query}`,
      data
    );
    return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};
