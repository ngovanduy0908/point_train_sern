import ApiUtils from "utils/api/api";

export const getStudentProofMark = async (params) => {
  try {
    const res = await ApiUtils.get(`/proof_mark/get_proof/${params}`);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
