import mongoose from 'mongoose';

interface IHabit extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  timeOfDay?: string;
  daysOfWeek?: number[];
  streak: number;
  completedDates: Date[];
  createdAt: Date;
}

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly'],
    required: true,
  },
  timeOfDay: {
    type: String,
  },
  daysOfWeek: {
    type: [Number],
    validate: {
      validator: (value: number[]) => 
        value.every((day: number) => day >= 0 && day <= 6),
      message: 'Days must be between 0 (Sunday) and 6 (Saturday)',
    },
  },
  streak: {
    type: Number,
    default: 0,
  },
  completedDates: [{
    type: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for efficient querying of user's habits
habitSchema.index({ user: 1, createdAt: -1 });

export const Habit = mongoose.model<IHabit>('Habit', habitSchema);