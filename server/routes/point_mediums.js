import express from 'express';
import {
  deletePointMedium,
  addPointMedium,
  editPointMedium,
  getAllPointMediumByMa,
} from '../controllers/point_medium.js';

const router = express.Router();
router.get('/:maLop/:maHK', getAllPointMediumByMa);
router.post('/:maHK', addPointMedium);
router.put('/:maHK', editPointMedium);
router.delete('/:maSv/:maHK', deletePointMedium);

export default router;
