import ApiUtils from "utils/api/api";

export const handleDataExportExcelKhoa = async (data) => {
  try {
    const res = await ApiUtils.postForm(`/departments/viewExcelBC/view`, data);
    // console.log("test: ", res);
    return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};
