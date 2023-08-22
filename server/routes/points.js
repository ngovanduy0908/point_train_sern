import express from 'express';
import {
  getCitizenMediumByMaSv,
  getPointStudentByMa,
  insertOrUpdatePointStudent,
} from '../controllers/point.js';

const router = express.Router();
router.get('/get_citizen_medium/:maHK/:maSv', getCitizenMediumByMaSv);
router.get('/get_point_student/:maHK/:maSv', getPointStudentByMa);
router.post('/insert_or_update/:maHK/:maSv', insertOrUpdatePointStudent);

export default router;
