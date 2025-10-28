import mongoose from 'mongoose';

interface INotification extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  habit: mongoose.Types.ObjectId;
  type: 'reminder' | 'streak' | 'achievement';
  message: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  type: {
    type: String,
    enum: ['reminder', 'streak', 'achievement'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for efficient querying of user's notifications
notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);