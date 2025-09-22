export const DEPARTMENTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Business Administration',
  'Engineering',
  'Medicine',
  'Law'
] as const;

export const ACADEMIC_YEARS = [
  2020, 2021, 2022, 2023, 2024, 2025
] as const;

export const SEMESTERS = [
  'Fall',
  'Spring',
  'Summer'
] as const;

export const STUDENT_STATUS = [
  'active',
  'inactive',
  'graduated',
  'dropped',
  'suspended'
] as const;

export const EXAM_TYPES = [
  'midterm',
  'final',
  'quiz',
  'assignment',
  'project'
] as const;

export const GRADE_SCALE = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0
} as const;