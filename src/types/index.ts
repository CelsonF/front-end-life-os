import { z } from 'zod';

export const prioritySchema = z.enum(['low', 'medium', 'high']);

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().min(1).max(150),
  photo: z.string().url().or(z.literal('')),
  level: z.number().int().min(1),
  experience: z.number().int().min(0),
  experienceToNextLevel: z.number().int().min(1),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  completed: z.boolean(),
  priority: prioritySchema,
  experience: z.number().int().min(0),
});

export const habitSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  completed: z.boolean(),
  icon: z.string().max(2),
  streak: z.number().int().min(0),
  bestStreak: z.number().int().min(0),
  experience: z.number().int().min(0),
});

export const timeBlockSchema = z.object({
  id: z.string(),
  start: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  end: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'),
  title: z.string().min(1, 'Title is required'),
  color: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type Task = z.infer<typeof taskSchema>;
export type Habit = z.infer<typeof habitSchema>;
export type TimeBlock = z.infer<typeof timeBlockSchema>;
