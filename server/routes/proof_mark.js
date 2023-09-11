import express from "express";
import {
  createOrUpdateProofStudent,
  exportFileExcel,
  getProofStudent,
} from "../controllers/proof_mark.js";

const router = express.Router();

router.get("/get_proof/:maHK/:maSv", getProofStudent);
router.post("/get_proof/excel", exportFileExcel);

router.post("/create_or_update_proof/:maHK", createOrUpdateProofStudent);

export default router;
