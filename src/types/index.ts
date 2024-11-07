import type { PrismaClient } from '.prisma/client';

// Basic types
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonString = string;

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}

export enum AssessmentType {
  REAL = 'REAL',
  PRACTICE = 'PRACTICE',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MULTIPLE_RESPONSE = 'MULTIPLE_RESPONSE',
  TRUE_FALSE = 'TRUE_FALSE',
  ESSAY = 'ESSAY',
  DRAG_AND_DROP = 'DRAG_AND_DROP',
  LIKERT_SCALE = 'LIKERT_SCALE',
  MATRIX = 'MATRIX',
}

export enum ExamType {
  REAL = 'REAL',
  PRACTICE = 'PRACTICE',
}

export enum AttemptStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
  TIMED_OUT = 'TIMED_OUT',
}

// Base interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  type: AssessmentType;
  duration: number;
  category: string | null;
  tags: string;
  settings: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  content: string;
  points: number;
  category: string | null;
  tags: string;
  examType: ExamType;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
}

// Extended types with relations
export interface AssessmentWithRelations extends Assessment {
  questions?: {
    question: Question;
    order: number;
    required: boolean;
  }[];
  createdBy?: User;
  _count?: {
    attempts: number;
  };
}

export interface ExtendedAssessment extends AssessmentWithRelations {
  totalQuestions?: number;
  totalPoints?: number;
  averagePoints?: number;
  totalAttempts?: number;
  parsedTags?: string[];
  parsedSettings?: Record<string, unknown>;
}

export interface QuestionWithRelations extends Question {
  createdBy?: User;
  assessments?: {
    assessmentId: string;
    order: number;
    required: boolean;
  }[];
}

export interface ExtendedQuestion extends QuestionWithRelations {
  parsedContent?: JsonValue;
  parsedTags?: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    pageSize: number;
    hasMore: boolean;
  };
  meta?: Record<string, unknown>;
}

// Database error type
export interface DatabaseError extends Error {
  code?: string;
  meta?: unknown;
}

// Input types
export interface CreateAssessmentInput {
  title: string;
  description?: string;
  type: AssessmentType;
  duration?: number;
  category?: string;
  tags?: string[];
  settings?: Record<string, unknown>;
  creatorId: string;
  questions?: Array<{
    id: string;
    required?: boolean;
  }>;
}

export interface CreateQuestionInput {
  title: string;
  type: QuestionType;
  content: JsonValue;
  points?: number;
  category?: string;
  tags?: string[];
  examType?: ExamType;
  creatorId: string;
}
