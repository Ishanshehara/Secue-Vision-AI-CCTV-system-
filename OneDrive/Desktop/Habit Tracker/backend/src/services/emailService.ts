import nodemailer from 'nodemailer';
import { User } from '../models/User';
import { Habit } from '../models/Habit';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailService = {
  async sendHabitReminder(user: User, habit: Habit) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: `Reminder: ${habit.title}`,
        text: `Don't forget to complete your habit: ${habit.title}\n\nKeep up the good work!`,
        html: `
          <h2>Habit Reminder</h2>
          <p>Don't forget to complete your habit: <strong>${habit.title}</strong></p>
          <p>Keep up the good work!</p>
        `,
      });
    } catch (error) {
      console.error('Failed to send reminder email:', error);
    }
  },

  async sendStreakMilestone(user: User, habit: Habit) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: `Congratulations! ${habit.streak} Day Streak on ${habit.title}`,
        text: `Amazing work! You've maintained a ${habit.streak} day streak on your habit: ${habit.title}. Keep going!`,
        html: `
          <h2>Streak Milestone Achieved! 🎉</h2>
          <p>Amazing work! You've maintained a <strong>${habit.streak} day streak</strong> on your habit:</p>
          <h3>${habit.title}</h3>
          <p>Keep up the fantastic progress!</p>
        `,
      });
    } catch (error) {
      console.error('Failed to send streak milestone email:', error);
    }
  },
};