export interface User {
  name: string;
  age: number;
  photo: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  experience: number;
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
  streak: number;
  bestStreak: number;
  experience: number;
}

export interface TimeBlock {
  id: string;
  start: string;
  end: string;
  title: string;
  color: string;
}
