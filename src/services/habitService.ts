import { habitSchema, type Habit } from '@/types';

const API_BASE = '/api';

export async function fetchHabits(): Promise<Habit[]> {
  const response = await fetch(`${API_BASE}/habits`);
  if (!response.ok) {
    throw new Error(`Failed to fetch habits: ${response.statusText}`);
  }
  const data: unknown = await response.json();
  return habitSchema.array().parse(data);
}

export async function createHabit(data: {
  title: string;
  description: string;
  icon: string;
  experience: number;
}): Promise<Habit> {
  const response = await fetch(`${API_BASE}/habits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create habit: ${response.statusText}`);
  }
  const dataResponse: unknown = await response.json();
  return habitSchema.parse(dataResponse);
}

export async function updateHabit(
  id: string,
  data: Partial<Habit>
): Promise<Habit> {
  const response = await fetch(`${API_BASE}/habits/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update habit: ${response.statusText}`);
  }
  const dataResponse: unknown = await response.json();
  return habitSchema.parse(dataResponse);
}

export async function deleteHabit(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/habits/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete habit: ${response.statusText}`);
  }
}
