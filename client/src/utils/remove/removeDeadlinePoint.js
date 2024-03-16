import ApiUtils from "utils/api/api";

export const deleteDeadlinePoint = async (data) => {
  try {
    // console.log("dât cliuent: ", data);
    await ApiUtils.removeNoCondition(`/deadlines_point`);
    // return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};
