import express from "express";
import {
  addMajor,
  deleteMajor,
  editMajor,
  getAllListMajor,
  getListMajorByMaKhoa,
} from "../controllers/major.js";

const router = express.Router();

router.get("/", getAllListMajor);
router.get("/:maKhoa", getListMajorByMaKhoa);
router.post("/", addMajor);
router.put("/:maCN", editMajor);
router.delete("/:maCN", deleteMajor);

export default router;
