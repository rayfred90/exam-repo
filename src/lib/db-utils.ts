import type { JsonValue } from '@/types';

export function stringifyForDb(value: unknown): string {
  if (typeof value === 'string') return value;
  return JSON.stringify(value || '');
}

export function parseFromDb<T>(value: string | null, defaultValue: T): T {
  if (!value) return defaultValue;
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

// Type-safe JSON string handling
export function toJsonString<T extends JsonValue>(data: T): string {
  return JSON.stringify(data);
}

export function fromJsonString<T extends JsonValue>(jsonString: string | null, defaultValue: T): T {
  if (!jsonString) return defaultValue;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return defaultValue;
  }
}

// Array handling
export function arrayToJsonString<T>(arr: T[]): string {
  return JSON.stringify(arr);
}

export function jsonStringToArray<T>(jsonString: string | null, defaultValue: T[] = []): T[] {
  if (!jsonString) return defaultValue;
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Object handling
export function objectToJsonString<T extends Record<string, JsonValue>>(obj: T): string {
  return JSON.stringify(obj);
}

export function jsonStringToObject<T extends Record<string, JsonValue>>(
  jsonString: string | null,
  defaultValue: T
): T {
  if (!jsonString) return defaultValue;
  try {
    const parsed = JSON.parse(jsonString);
    return typeof parsed === 'object' && parsed !== null ? parsed as T : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Database error handling
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public meta?: unknown
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Safe database operations
export async function withDatabaseError<T>(
  operation: () => Promise<T>,
  errorMessage = 'Database operation failed'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw new DatabaseError(
      errorMessage,
      error instanceof Error ? error.message : undefined,
      error
    );
  }
}
