import ApiUtils from "utils/api/api";

export const statisticalKhoa = async (query) => {
  try {
    const res = await ApiUtils.get(`/departments/statistical?${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const statisticalPieChartKhoa = async (query) => {
  try {
    // console.log("query: ", query);
    const res = await ApiUtils.get(
      `/points/point_statistical_pie_department?${query}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const statisticalAdmin = async () => {
  try {
    const res = await ApiUtils.get(`/departments/countManyAdmin`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const statisticalStackChartAdmin = async (query) => {
  try {
    const res = await ApiUtils.get(
      `/points/point_statistical_stack_admin?${query}`
    );
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
