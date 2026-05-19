import { create } from 'zustand';
import type { User } from '@/types';

interface UserState {
  user: User;
  updateUser: (partial: Partial<User>) => void;
}

const defaultUser: User = {
  name: 'User',
  age: 25,
  photo: '',
  level: 7,
  experience: 450,
  experienceToNextLevel: 1000,
};

export const useUserStore = create<UserState>((set) => ({
  user: defaultUser,
  updateUser: (partial) =>
    set((state) => ({ user: { ...state.user, ...partial } })),
}));
