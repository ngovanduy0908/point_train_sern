import express from "express";
import {
  addStudent,
  deleteStudent,
  editStudent,
  getClassByMaGv,
  getInfoForPhieuDiem,
  getStudentByMaLop,
  getSVByMaSV,
  updateRole,
} from "../controllers/student.js";

const router = express.Router();
router.get("/phieu/info-and-point", getInfoForPhieuDiem);
router.get("/get_one_sv/:maHK/:maSv", getSVByMaSV);
router.get("/get-student/:maLop", getStudentByMaLop);
router.get("/:maGv", getClassByMaGv);
router.post("/:maLop", addStudent);
router.put("/change-role/:maSv/:role_id", updateRole);
router.put("/change-student/:maSv", editStudent);
router.delete("/:maSv", deleteStudent);

export default router;
