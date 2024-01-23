import { toast } from "react-toastify";
import ApiUtils from "utils/api/api";
import { supabase } from "utils/function/supabase";

export const handleDataExportExcelGV = async (data) => {
  try {
    const res = await ApiUtils.postForm(`/teachers/viewExcelBC/view`, data);
    return res.data;
  } catch (error) {
    console.log("errors", error);
  }
};

export const generateUrlExcel = async (arrBuffer, tenFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const uint8Array = new Uint8Array(arrBuffer);
      //   console.log('uint8Array: ', uint8Array);
      // Chuyển đổi Uint8Array thành Blob
      const blob = new Blob([uint8Array], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      //   console.log('blob: ', blob);
      const file = new File([blob], `${tenFile}_${new Date().getTime()}.xlsx`, {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      console.log("file: ", file);
      const formData = new FormData();
      formData.append("file", file);
      const { data, errorMsg } = await supabase.storage
        .from("files")
        .upload(`excel/${Date.now()}.xlsx`, file);
      if (errorMsg) {
        toast.error("Có Lỗi");
      }
      const url = supabase.storage.from("files").getPublicUrl(data.path);
      console.log("data supbase: ", url.data.publicUrl);
      //   console.log('formData: ', formData);
      const filePath = url.data.publicUrl;
      resolve({ filePath, name: file.name });
    } catch (error) {
      reject(error);
    }
  });
};

export const downloadFile = (fileUrl, originalFileName) => {
  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalFileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
