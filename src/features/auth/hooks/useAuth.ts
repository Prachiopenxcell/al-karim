'use client';

import { useState, useEffect } from 'react';
import { AuthUser, AuthState } from '../types/auth.types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // Simulate checking for existing session
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
          const user: AuthUser = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to check authentication status',
        }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user based on email
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
          avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face'
        };
      } else {
        user = {
          id: '2',
          email,
          firstName: 'Ahmed',
          lastName: 'Hassan',
          role: 'student',
          department: 'Medicine',
          designation: 'Medical Student',
          avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face'
        };
      }

      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return user;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Invalid credentials',
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}