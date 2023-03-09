import express from 'express';
import {
  addPointCitizen,
  deletePointCitizen,
  editPointCitizen,
  getAllPointCitizenByMa,
} from '../controllers/point_citizen.js';

const router = express.Router();
router.get('/:maLop/:maHK', getAllPointCitizenByMa);
router.post('/:maHK', addPointCitizen);
router.put('/:maHK', editPointCitizen);
router.delete('/:maSv/:maHK', deletePointCitizen);

export default router;
