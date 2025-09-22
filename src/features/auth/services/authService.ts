import { LoginCredentials, AuthUser } from '../types/auth.types';

class AuthService {
  // Mocked implementation: no network calls
  private storageKey = 'auth_user';

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    // Simulate latency
    await new Promise((r) => setTimeout(r, 800));
    const { email } = credentials;

    // Create a mock user based on email
    let user: AuthUser;
    if (email.includes('dean')) {
      user = {
        id: '1',
        email,
        firstName: 'Dr. Johnathan',
        lastName: 'Doe',
        role: 'dean',
        department: 'Medicine',
        designation: 'Dean of Medicine',
        specialization: 'Internal Medicine',
        avatar:
          'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face',
      } as AuthUser;
    } else {
      user = {
        id: '2',
        email,
        firstName: 'Ahmed',
        lastName: 'Hassan',
        role: 'student',
        department: 'Medicine',
        designation: 'Medical Student',
        avatar:
          'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face',
      } as AuthUser;
    }

    // Persist to localStorage for demo session
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }

    return user;
  }

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(this.storageKey);
    return saved ? (JSON.parse(saved) as AuthUser) : null;
  }

  async refreshToken(): Promise<string | null> {
    // No-op in mock; return a fake token after a small delay
    await new Promise((r) => setTimeout(r, 300));
    return 'mock-token-123';
  }

  async forgotPassword(email: string): Promise<void> {
    // Simulate sending email
    await new Promise((r) => setTimeout(r, 800));
    console.info(`[Mock] Sent password reset email to ${email}`);
  }

  async resetPassword(token: string, password: string): Promise<void> {
    // Simulate verifying token and setting password
    await new Promise((r) => setTimeout(r, 800));
    console.info(`[Mock] Reset password with token ${token}. New password length: ${password.length}`);
  }
}

export const authService = new AuthService();