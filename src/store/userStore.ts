import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface UserState {
  user: User;
  updateUser: (partial: Partial<User>) => void;
}

const DEFAULT_USER: User = {
  name: 'User',
  age: 25,
  photo: '',
  level: 7,
  experience: 450,
  experienceToNextLevel: 1000,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      updateUser: (partial) =>
        set((state) => ({ user: { ...state.user, ...partial } })),
    }),
    { name: 'life-os-user' }
  )
);
