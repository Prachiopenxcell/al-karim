'use client';

import { useState } from 'react';
import { AuthHeader } from '@/features/auth/components/AuthHeader';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/features/auth/services/authService';
import { CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (e) {
      // optionally show toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthHeader />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthCard title={sent ? 'Check your inbox' : 'Forgot Password'} description={sent ? undefined : 'We will send you a password reset link'}>
          {sent ? (
            <div className="flex flex-col items-center space-y-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
              <p className="text-sm text-gray-600">
                If an account exists for <span className="font-medium">{email}</span>, you will receive an email with a password reset link shortly.
              </p>
              <Button className="w-full al-karim-gradient text-white" onClick={() => setSent(false)}>Send to a different email</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 h-12" placeholder="you@alkarim.edu" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-12 al-karim-gradient text-white font-medium">
                {isSubmitting ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          )}
        </AuthCard>
      </div>

      <AuthFooter />
    </div>
  );
}
