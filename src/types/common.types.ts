export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'faculty' | 'admin' | 'staff';
  avatar?: string;
  department?: string;
  designation?: string;
}

export interface Student extends User {
  studentID: string;
  program: string;
  academicYear: number;
  guardianInfo: {
    name: string;
    contact: string;
    relationship: string;
  };
}

export interface Faculty extends User {
  employeeID: string;
  qualifications: string[];
  joiningDate: Date;
  subjects: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  source: string;
  status: 'pending' | 'contacted' | 'qualified' | 'enrolled' | 'rejected';
  assignedCounsellor?: string;
  lastUpdated: Date;
  notes?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  semester: number;
  facultyId: string;
  description?: string;
  prerequisites?: string[];
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  date: Date;
  duration: number;
  totalMarks: number;
  type: 'midterm' | 'final' | 'quiz' | 'assignment';
  status: 'scheduled' | 'ongoing' | 'completed';
}