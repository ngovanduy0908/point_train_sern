import express from 'express';
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
  getAllListTeacher,
} from '../controllers/teacher.js';

const router = express.Router();

router.get('/:maKhoa', getAllListTeacher);
router.post('/:maKhoa', addTeacher);
router.put('/:maKhoa/:maGv', editTeacher);
router.delete('/:maKhoa/:maGv', deleteTeacher);

export default router;
