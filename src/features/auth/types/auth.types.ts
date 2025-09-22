export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'faculty' | 'admin' | 'dean' | 'resident';
  avatar?: string;
  department?: string;
  designation?: string;
  specialization?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface MedicalStudent extends AuthUser {
  studentID: string;
  program: 'MBBS' | 'MD' | 'MS' | 'DM' | 'MCh';
  academicYear: number;
  currentRotation?: string;
  clinicalSite?: string;
  guardianInfo: {
    name: string;
    contact: string;
    relationship: string;
  };
}

export interface MedicalFaculty extends AuthUser {
  employeeID: string;
  qualifications: string[];
  joiningDate: Date;
  specialization: string;
  clinicalDepartment: string;
  teachingLoad: number;
  researchInterests: string[];
}