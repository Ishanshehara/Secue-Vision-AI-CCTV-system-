import axios from 'axios';
import { User, Habit, Notification } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface AuthResponse {
  token: string;
  user: User;
}

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async register(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

export const habitService = {
  async createHabit(data: Omit<Habit, '_id' | 'streak' | 'completedDates' | 'createdAt'>): Promise<Habit> {
    const response = await api.post<Habit>('/habits', data);
    return response.data;
  },

  async getHabits(): Promise<Habit[]> {
    const response = await api.get<Habit[]>('/habits');
    return response.data;
  },

  async updateHabit(id: string, data: Partial<Habit>): Promise<Habit> {
    const response = await api.put<Habit>(`/habits/${id}`, data);
    return response.data;
  },

  async deleteHabit(id: string): Promise<void> {
    await api.delete(`/habits/${id}`);
  },

  async markComplete(id: string): Promise<Habit> {
    const response = await api.post<Habit>(`/habits/${id}/complete`);
    return response.data;
  },
};

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
  },

  async markAsRead(id: string): Promise<Notification> {
    const response = await api.put<Notification>(`/notifications/${id}/read`);
    return response.data;
  },

  async deleteNotification(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },
};