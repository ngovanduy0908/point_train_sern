import express from "express";
import {
  addStudent,
  changeInfoEmail,
  changeInfoPhone,
  deleteStudent,
  editStudent,
  getClassByMaGv,
  getInfoForPhieuDiem,
  getManyInfo,
  getStudentByMaLop,
  getSVByMaSV,
  updateRole,
} from "../controllers/student.js";

const router = express.Router();
router.get("/phieu/info-and-point", getInfoForPhieuDiem);
router.get("/getManyInfo", getManyInfo);
router.get("/get_one_sv/:maHK/:maSv", getSVByMaSV);
router.get("/get-student/:maLop", getStudentByMaLop);
router.get("/:maGv", getClassByMaGv);
router.post("/change_email", changeInfoEmail);
router.post("/change_phone", changeInfoPhone);

router.post("/:maLop", addStudent);
router.put("/change-role/:maSv/:role_id", updateRole);
router.put("/change-student/:maSv", editStudent);
router.delete("/:maSv", deleteStudent);

export default router;
