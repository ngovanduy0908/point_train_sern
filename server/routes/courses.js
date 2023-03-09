import express from 'express';
import {
  addCourse,
  getAllListCourse,
  editCourse,
  deleteCourse,
} from '../controllers/course.js';

const router = express.Router();

router.get('/', getAllListCourse);
router.post('/', addCourse);
router.put('/:maKhoaHoc', editCourse);
router.delete('/:maKhoaHoc', deleteCourse);

export default router;
