import ApiUtils from "utils/api/api";
export const getPointMonitorByMaSVAndMaHK = async (query) => {
  try {
    // console.log("query: ", query);
    const res = await ApiUtils.get(`/points/get_point_monitor?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
