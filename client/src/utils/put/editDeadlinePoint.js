import ApiUtils from "utils/api/api";

export const editDeadlinePoint = async (data) => {
  try {
    // console.log("dât cliuent: ", data);
    await ApiUtils.put(`/deadlines_point`, data);
    // return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};
