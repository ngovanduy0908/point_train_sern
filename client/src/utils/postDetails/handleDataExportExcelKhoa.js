import ApiUtils from "utils/api/api";

export const handleDataExportExcelKhoa = async (data) => {
  try {
    // console.log("data: ", data);
    const res = await ApiUtils.postForm(`/departments/viewExcelBC/view`, data);
    return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};
