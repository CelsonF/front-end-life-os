import { timeBlockSchema, type TimeBlock } from '@/types';

const API_BASE = '/api';

export async function fetchTimeBlocks(): Promise<TimeBlock[]> {
  const response = await fetch(`${API_BASE}/time-blocks`);
  if (!response.ok) {
    throw new Error(`Failed to fetch time blocks: ${response.statusText}`);
  }
  const data: unknown = await response.json();
  return timeBlockSchema.array().parse(data);
}

export async function createTimeBlock(data: {
  title: string;
  start: string;
  end: string;
  color: string;
}): Promise<TimeBlock> {
  const response = await fetch(`${API_BASE}/time-blocks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create time block: ${response.statusText}`);
  }
  const dataResponse: unknown = await response.json();
  return timeBlockSchema.parse(dataResponse);
}

export async function updateTimeBlock(
  id: string,
  data: Partial<TimeBlock>
): Promise<TimeBlock> {
  const response = await fetch(`${API_BASE}/time-blocks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update time block: ${response.statusText}`);
  }
  const dataResponse: unknown = await response.json();
  return timeBlockSchema.parse(dataResponse);
}

export async function deleteTimeBlock(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/time-blocks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete time block: ${response.statusText}`);
  }
}
