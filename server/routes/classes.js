import express from 'express';
import {
  addClass,
  changeGV,
  changeKhoaHoc,
  deleteClass,
  editClass,
  //   addTeacher,
  //   deleteTeacher,
  //   editTeacher,
  getAllListClass,
} from '../controllers/class.js';

const router = express.Router();

router.get('/:maKhoa', getAllListClass);
router.post('/:maKhoa', addClass);
router.put('/:maLop', editClass);

router.put('/changeGV/:maLop/:maGv', changeGV);
router.put('/changeKhoaHoc/:maLop/:maKhoaHoc', changeKhoaHoc);

router.delete('/:maKhoa/:maLop', deleteClass);

export default router;
