export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  DASHBOARD: {
    HOME: '/dashboard',
    LEADS: '/dashboard/leads',
    COUNSELLOR: '/dashboard/counsellor',
    AGENTS: '/dashboard/agents',
    ADMISSION: '/dashboard/admission',
    OMR: '/dashboard/omr',
    STUDENTS: '/dashboard/students',
    FEES: '/dashboard/fees',
    LIBRARY: '/dashboard/library',
    ASSIGNMENTS: '/dashboard/assignments',
    PROFILE: '/dashboard/profile',
    ATTENDANCE: '/dashboard/attendance',
    TIMETABLE: '/dashboard/timetable',
    SECURITY: '/dashboard/security',
  },
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    ACADEMIC: '/admin/academic',
    FINANCIAL: '/admin/financial',
    INFRASTRUCTURE: '/admin/infrastructure',
    ANALYTICS: '/admin/analytics',
    CONTENT: '/admin/content',
  }
} as const;