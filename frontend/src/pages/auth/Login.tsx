import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '../../components/common/UI/ThemeToggle';

const Login: React.FC = () => {
  const { loginWithGoogle, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  if (isLoading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[rgb(var(--color-bg))]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--color-primary))]"></div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] flex flex-col font-sans transition-colors duration-300">
      <nav className="w-full px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-[rgb(var(--color-primary))]">
            <LayoutDashboard size={24} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">APMS</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="bg-[rgb(var(--color-primary))] hover:opacity-90 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            Request Access
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] bg-[rgb(var(--color-card))] border-[rgb(var(--color-border))] rounded-2xl p-8 sm:p-10 shadow-2xl dark:shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
            <p className="text-[rgb(var(--color-muted))] text-sm">Sign in to the Academic Project Monitoring System</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold ml-1 text-[rgb(var(--color-muted))]">Email</label>
              <input type="email" placeholder="Enter your academic email" className="w-full bg-[rgb(var(--color-input))] border-[rgb(var(--color-border))] rounded-lg px-4 py-3 text-sm text-[rgb(var(--color-text))] placeholder:text-[rgb(var(--color-muted))] focus:outline-none focus:ring-0 transition-colors" />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-[rgb(var(--color-muted))]">Password</label>
                <a href="#" className="text-xs text-blue-500 hover:text-blue-400 font-medium">Forgot Password?</a>
              </div>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-[rgb(var(--color-input))] border-[rgb(var(--color-border))] rounded-lg px-4 py-3 text-sm text-[rgb(var(--color-text))] placeholder:text-[rgb(var(--color-muted))] focus:outline-none focus:ring-0 transition-colors pr-10" />
                <button type="button" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 dark:text-slate-500 dark:hover:text-slate-300">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="w-full bg-[rgb(var(--color-primary))] hover:opacity-95 text-white font-bold py-3 rounded-lg transition-all mt-6">Sign In</button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[rgb(var(--color-border))]"></span>
              </div>
              <span className="relative bg-[rgb(var(--color-card))] px-3 text-[10px] uppercase tracking-wider text-[rgb(var(--color-muted))] font-medium">Or Continue With</span>
            </div>

            <button onClick={() => loginWithGoogle()} className="w-full bg-[rgb(var(--color-card))] border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] hover:opacity-95 font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-[rgb(var(--color-muted))]">By signing in, you agree to our <a href="#" className="underline hover:opacity-80">Terms of Service</a> and <a href="#" className="underline hover:opacity-80">Privacy Policy</a>.</p>
        </div>
      </div>

      <footer className="py-6 text-center text-xs text-[rgb(var(--color-muted))] border-t border-[rgb(var(--color-border))]">© 2026 Academic Project Monitoring System. All rights reserved.</footer>
    </div>
  );
};

export default Login;
