import express from "express";
import { getPointStudent } from "../controllers/point_admin.js";
const router = express.Router();
router.get("/:maHK", getPointStudent);
export default router;
