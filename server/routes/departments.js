import express from 'express';
import {
  editDepartment,
  getAllListDepartment,
  addDepartment,
  deleteDepartment,
} from '../controllers/department.js';

const router = express.Router();

router.get('/', getAllListDepartment);
router.post('/', addDepartment);
router.put('/:maKhoa', editDepartment);
router.delete('/:maKhoa', deleteDepartment);

export default router;
