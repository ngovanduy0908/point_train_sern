import express from "express";

import {
  addDeadlinePoint,
  deleteDeadlinePoint,
  editDeadlinePoint,
  getDeadlinePoint,
} from "../controllers/deadline_point.js";

const router = express.Router();
router.get("/", getDeadlinePoint);
// router.get("/:maGv", getDeadline);
router.post("/", addDeadlinePoint);
router.put("/", editDeadlinePoint);
router.delete("/", deleteDeadlinePoint);

export default router;
