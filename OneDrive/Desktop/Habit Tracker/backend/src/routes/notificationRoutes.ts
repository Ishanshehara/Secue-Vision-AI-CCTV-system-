import express from 'express';
import { notificationController } from '../controllers/notificationController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', auth, notificationController.getUserNotifications);
router.put('/:id/read', auth, notificationController.markNotificationAsRead);
router.delete('/:id', auth, notificationController.deleteNotification);

export default router;