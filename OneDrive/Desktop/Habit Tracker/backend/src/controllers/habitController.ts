import { Request, Response } from 'express';
import { Habit } from '../models/Habit';
import { Notification } from '../models/Notification';

interface AuthRequest extends Request {
  user?: any;
}

export const habitController = {
  async createHabit(req: AuthRequest, res: Response) {
    try {
      const habit = new Habit({
        ...req.body,
        user: req.user._id,
      });
      await habit.save();
      res.status(201).json(habit);
    } catch (error) {
      res.status(400).json({ error: 'Could not create habit' });
    }
  },

  async getUserHabits(req: AuthRequest, res: Response) {
    try {
      const habits = await Habit.find({ user: req.user._id })
        .sort({ createdAt: -1 });
      res.json(habits);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch habits' });
    }
  },

  async updateHabit(req: AuthRequest, res: Response) {
    try {
      const habit = await Habit.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
      );
      if (!habit) {
        return res.status(404).json({ error: 'Habit not found' });
      }
      res.json(habit);
    } catch (error) {
      res.status(400).json({ error: 'Could not update habit' });
    }
  },

  async deleteHabit(req: AuthRequest, res: Response) {
    try {
      const habit = await Habit.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      if (!habit) {
        return res.status(404).json({ error: 'Habit not found' });
      }
      res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Could not delete habit' });
    }
  },

  async markHabitComplete(req: AuthRequest, res: Response) {
    try {
      const habit = await Habit.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!habit) {
        return res.status(404).json({ error: 'Habit not found' });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Check if already completed today
      const completedToday = habit.completedDates.some(date => {
        const completedDate = new Date(date);
        completedDate.setHours(0, 0, 0, 0);
        return completedDate.getTime() === today.getTime();
      });

      if (!completedToday) {
        habit.completedDates.push(today);
        
        // Update streak
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const completedYesterday = habit.completedDates.some(date => {
          const completedDate = new Date(date);
          completedDate.setHours(0, 0, 0, 0);
          return completedDate.getTime() === yesterday.getTime();
        });

        if (completedYesterday) {
          habit.streak += 1;
          
          // Create streak notification for milestones
          if (habit.streak % 5 === 0) {
            const notification = await Notification.create({
              user: req.user._id,
              habit: habit._id,
              type: 'streak',
              message: `Congratulations! You've maintained a ${habit.streak} day streak for ${habit.title}!`,
            });

            // Send email notification
            const emailService = require('../services/emailService').emailService;
            await emailService.sendStreakMilestone(req.user, habit);
          }
        } else {
          habit.streak = 1;
        }

        await habit.save();
      }

      res.json(habit);
    } catch (error) {
      res.status(400).json({ error: 'Could not mark habit as complete' });
    }
  },
};