'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';
import { AuthHeader } from '@/features/auth/components/AuthHeader';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { PasswordInput } from '@/features/auth/components/PasswordInput';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthHeader />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthCard title="Welcome Back" description="Sign in to access your medical university portal">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 h-12"
                  placeholder="doctor@alkarim.edu"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  containerClassName="mt-2"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 al-karim-gradient text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Quick Access Demo</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  onClick={() => {setEmail('dean@alkarim.edu'); setPassword('dean123');}}
                  className="w-full h-12 border-2 hover:bg-primary hover:text-white transition-colors"
                >
                  <Image src="/images/icon.svg" alt="Al Karim" width={16} height={16} className="mr-2" />
                  Dean Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {setEmail('student@alkarim.edu'); setPassword('student123');}}
                  className="w-full h-12 border-2 hover:bg-primary hover:text-white transition-colors"
                >
                  <Image src="/images/icon.svg" alt="Al Karim" width={16} height={16} className="mr-2" />
                  Medical Student Login
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-dark font-medium">
                Forgot your password?
              </Link>
            </div>
        </AuthCard>
      </div>
      <AuthFooter />
    </div>
  );
}