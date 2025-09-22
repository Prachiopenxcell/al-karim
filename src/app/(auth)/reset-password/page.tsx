'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthHeader } from '@/features/auth/components/AuthHeader';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/features/auth/components/PasswordInput';
import { authService } from '@/features/auth/services/authService';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.resetPassword(token, password);
      router.push('/login');
    } catch (e) {
      setError('Failed to reset password. The link may be invalid or expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthHeader />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthCard title="Reset Password" description="Enter your new password to regain access">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password">New Password</Label>
              <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm Password</Label>
              <PasswordInput id="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-2" placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full h-12 al-karim-gradient text-white font-medium">
              {isSubmitting ? 'Updating...' : 'Update password'}
            </Button>
          </form>
        </AuthCard>
      </div>

      <AuthFooter />
    </div>
  );
}
