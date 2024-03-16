import express from "express";

import {
  addDeadlinePoint,
  deleteDeadlinePoint,
  editDeadlinePoint,
  getDeadlineCheckPoint,
  getDeadlinePoint,
} from "../controllers/deadline_point.js";

const router = express.Router();
router.get("/check_point", getDeadlineCheckPoint);
router.get("/", getDeadlinePoint);
router.post("/", addDeadlinePoint);
router.put("/", editDeadlinePoint);
router.delete("/", deleteDeadlinePoint);

export default router;
