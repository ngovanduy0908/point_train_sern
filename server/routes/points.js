import express from "express";
import {
  getCitizenMediumByMaSv,
  getListPointByMaSV,
  getPointMonitorByMa,
  getPointStudentByMa,
  getPointStudentByMaLopAndMaHK,
  getPointStudentNoMark,
  getPointStudentTeacherByMaLopAndMaHK,
  getPointTeacherByMa,
  insertOrUpdatePointStudent,
  insertOrUpdatePointStudentMonitor,
  insertOrUpdatePointTeacher,
  markZero,
  pointBasicChart,
  pointBasicChartPercent,
  pointGvNote,
  statisticalPieDepartment,
} from "../controllers/point.js";

const router = express.Router();
router.get("/get_citizen_medium/:maHK/:maSv", getCitizenMediumByMaSv);
router.get("/get_point_student/:maHK/:maSv", getPointStudentByMa);
router.get("/get_point_ds_lop", getPointStudentByMaLopAndMaHK);
router.get("/get_point_monitor", getPointMonitorByMa);
router.get("/studentNoMark", getPointStudentNoMark);
router.get("/get_point_teacher", getPointStudentTeacherByMaLopAndMaHK);
router.get("/point_teacher", getPointTeacherByMa);
router.get("/list_point", getListPointByMaSV);
router.get("/gvNote", pointGvNote);
router.get("/point_basic_chart", pointBasicChart);
router.get("/point_basic_chart_percent", pointBasicChartPercent);
router.get("/point_statistical_pie_department", statisticalPieDepartment);
router.post("/insert_or_update/:maHK/:maSv", insertOrUpdatePointStudent);
router.post("/insert_or_update_monitor", insertOrUpdatePointStudentMonitor);
router.post("/mark_zero", markZero);
router.post("/insert_or_update_teacher", insertOrUpdatePointTeacher);
export default router;
