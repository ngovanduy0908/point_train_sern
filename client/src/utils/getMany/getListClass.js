import ApiUtils from "utils/api/api";

export const getListClass = async (params) => {
  try {
    const res = await ApiUtils.get(`/class/${params}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
