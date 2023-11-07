import ApiUtils from "utils/api/api";

export const insertOrUpdatePointStudentMonitor = async (query, data) => {
  try {
    const res = await ApiUtils.postForm(
      `/points/insert_or_update_monitor?${query}`,
      data
    );
    return res.data;
  } catch (error) {
    console.log("errorss", error);
  }
};
