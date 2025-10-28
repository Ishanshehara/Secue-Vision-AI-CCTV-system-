import express from 'express';
import { habitController } from '../controllers/habitController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, habitController.createHabit);
router.get('/', auth, habitController.getUserHabits);
router.put('/:id', auth, habitController.updateHabit);
router.delete('/:id', auth, habitController.deleteHabit);
router.post('/:id/complete', auth, habitController.markHabitComplete);

export default router;