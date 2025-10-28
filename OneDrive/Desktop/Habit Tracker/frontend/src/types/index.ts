export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Habit {
  _id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  timeOfDay?: string;
  daysOfWeek?: number[];
  streak: number;
  completedDates: string[];
  createdAt: string;
}

export interface Notification {
  _id: string;
  habit: Habit;
  type: 'reminder' | 'streak' | 'achievement';
  message: string;
  read: boolean;
  createdAt: string;
}