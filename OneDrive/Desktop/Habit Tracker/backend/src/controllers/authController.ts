import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create new user
      const user = new User({ name, email, password });
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '7d' }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Registration failed' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user and check password
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '7d' }
      );

      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Login failed' });
    }
  },
};