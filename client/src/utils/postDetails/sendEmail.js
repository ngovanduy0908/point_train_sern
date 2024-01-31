import { toast } from "react-toastify";
import ApiUtils from "utils/api/api";

export const sendEmail = async (data) => {
  try {
    const res = await ApiUtils.postForm(`/send-email`, data);
    return res.data;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
