import express from "express";
import {
  editDepartment,
  getAllListDepartment,
  addDepartment,
  deleteDepartment,
  getNameDepartmentByMa,
  statisticalDepartment,
  getCountManyAdmin,
  viewExcelBC,
} from "../controllers/department.js";

const router = express.Router();

router.get("/statistical", statisticalDepartment);
router.get("/countManyAdmin", getCountManyAdmin);
router.get("/", getAllListDepartment);
router.get("/:maKhoa", getNameDepartmentByMa);
router.post("/viewExcelBC/view", viewExcelBC);
router.post("/", addDepartment);
router.put("/:maKhoa", editDepartment);
router.delete("/:maKhoa", deleteDepartment);

export default router;
