import express from "express";
import { deleteDeadline } from "../controllers/deadline.js";
import {
  addDeadlineAdmin,
  editDeadlineAdmin,
  getDeadlineAdmin,
} from "../controllers/deadline_admin.js";

const router = express.Router();
// router.get("/deadlineMaLop/:maLop", deadlineWithMaSv);
router.get("/:maHK", getDeadlineAdmin);
router.post("/:maHK", addDeadlineAdmin);
router.put("/", editDeadlineAdmin);
router.delete("/:maGv", deleteDeadline);

export default router;
