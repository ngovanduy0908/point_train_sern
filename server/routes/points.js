import express from "express";
import {
  getCitizenMediumByMaSv,
  getPointMonitorByMa,
  getPointStudentByMa,
  getPointStudentByMaLopAndMaHK,
  insertOrUpdatePointStudent,
  insertOrUpdatePointStudentMonitor,
} from "../controllers/point.js";

const router = express.Router();
router.get("/get_citizen_medium/:maHK/:maSv", getCitizenMediumByMaSv);
router.get("/get_point_student/:maHK/:maSv", getPointStudentByMa);
router.get("/get_point_ds_lop", getPointStudentByMaLopAndMaHK);
router.get("/get_point_monitor", getPointMonitorByMa);
router.post("/insert_or_update/:maHK/:maSv", insertOrUpdatePointStudent);
router.post("/insert_or_update_monitor", insertOrUpdatePointStudentMonitor);
export default router;
