import { Request, Response } from 'express';
import { Notification } from '../models/Notification';
import nodemailer from 'nodemailer';

interface AuthRequest extends Request {
  user?: any;
}

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const notificationController = {
  async getUserNotifications(req: AuthRequest, res: Response) {
    try {
      const notifications = await Notification.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .populate('habit', 'title');
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch notifications' });
    }
  },

  async markNotificationAsRead(req: AuthRequest, res: Response) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { read: true },
        { new: true }
      );
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.json(notification);
    } catch (error) {
      res.status(400).json({ error: 'Could not update notification' });
    }
  },

  async sendEmail(userId: string, subject: string, text: string) {
    try {
      const user = await require('../models/User').User.findById(userId);
      if (!user || !user.email) return;

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject,
        text,
      });
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  },

  async deleteNotification(req: AuthRequest, res: Response) {
    try {
      const notification = await Notification.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Could not delete notification' });
    }
  },
};