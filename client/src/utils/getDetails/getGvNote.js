import ApiUtils from "utils/api/api";

export const getGvNote = async (query) => {
  try {
    const res = await ApiUtils.get(`/points/gvNote?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
