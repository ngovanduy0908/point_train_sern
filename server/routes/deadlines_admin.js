import express from "express";
import {
  addDeadlineAdmin,
  deleteDeadlineAdmin,
  editDeadlineAdmin,
  getAllDeadlineAdmin,
  getDeadlineAdmin,
} from "../controllers/deadline_admin.js";

const router = express.Router();
// router.get("/deadlineMaLop/:maLop", deadlineWithMaSv);
router.get("/:maHK", getDeadlineAdmin);
router.get("/", getAllDeadlineAdmin);

router.post("/:maHK", addDeadlineAdmin);
router.put("/", editDeadlineAdmin);
router.delete("/:maHK", deleteDeadlineAdmin);

export default router;
