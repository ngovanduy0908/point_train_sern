import express from 'express';
import {
  //   addCourse,
  getAllListSemester,
  changeSemester,
  addSemester,
  deleteSemester,
  getSemesterOpen,
  //   editCourse,
  //   deleteCourse,
} from '../controllers/semester.js';

const router = express.Router();

router.get('/', getAllListSemester);
router.get('/get_semester_open', getSemesterOpen);

router.put('/:maHK/:status', changeSemester);
router.post('/', addSemester);
// router.put('/:maKhoaHoc', editCourse);
router.delete('/:maHK', deleteSemester);

export default router;
