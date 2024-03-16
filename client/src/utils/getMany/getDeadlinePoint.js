import ApiUtils from "utils/api/api";

export const getAllDeadlinePoint = async () => {
  try {
    const res = await ApiUtils.get(`/deadlines_point`);
    // console.log("res neeeeee: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDeadlinePointCheck = async () => {
  try {
    const res = await ApiUtils.get(`/deadlines_point/check_point`);
    console.log("res neeeeee: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
