import { taskSchema, type Task, type Priority } from '@/types';

const API_BASE = '/api';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE}/tasks`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  const data: unknown = await response.json();
  return taskSchema.array().parse(data);
}

export async function createTask(data: {
  title: string;
  priority: Priority;
  experience: number;
}): Promise<Task> {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.statusText}`);
  }
  const dataResponse: unknown = await response.json();
  return taskSchema.parse(dataResponse);
}

export async function updateTask(
  id: string,
  data: Partial<Task>
): Promise<Task> {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.statusText}`);
  }
  const dataResponse: unknown = await response.json();
  return taskSchema.parse(dataResponse);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.statusText}`);
  }
}
