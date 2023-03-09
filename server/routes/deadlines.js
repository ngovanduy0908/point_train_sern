import express from 'express';
import {
  addDeadline,
  deleteDeadline,
  editDeadline,
  getDeadline,
} from '../controllers/deadline.js';

const router = express.Router();
router.get('/:maGv', getDeadline);
router.post('/:maGv', addDeadline);
router.put('/:maGv', editDeadline);
router.delete('/:maGv', deleteDeadline);

export default router;
