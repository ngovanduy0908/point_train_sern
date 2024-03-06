import ApiUtils from "utils/api/api";

export const getDeadlineAdmin = async (params) => {
  try {
    const res = await ApiUtils.get(`/deadlines_admin/${params}`);
    // console.log("res ne: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDeadlineAdmin = async () => {
  try {
    const res = await ApiUtils.get(`/deadlines_admin`);
    // console.log("res ne: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
