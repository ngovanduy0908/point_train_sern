import express from 'express';
import {
  addStudent,
  deleteStudent,
  editStudent,
  getClassByMaGv,
  getStudentByMaLop,
  getSVByMaSV,
  updateRole,
} from '../controllers/student.js';

const router = express.Router();
router.get('/:maGv', getClassByMaGv);
router.get('/get_one_sv/:maHK/:maSv', getSVByMaSV);
router.post('/:maLop', addStudent);
router.get('/get-student/:maLop', getStudentByMaLop);
router.put('/change-role/:maSv/:role_id', updateRole);
router.put('/change-student/:maSv', editStudent);
router.delete('/:maSv', deleteStudent);

export default router;
