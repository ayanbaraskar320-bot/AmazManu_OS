import React, { useState } from 'react';
import Button from './ui/Button';
import { UserIcon, LockIcon } from './icons/IconComponents';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - typically this would call an API
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop"
          alt="Forest Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bc-blue/90 to-bc-green/80 mix-blend-multiply"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md z-10 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700 mx-4 animate-slide-up transform transition-all">
        <div className="flex flex-col items-center mb-8">
          <div className="w-full flex justify-center mb-6">
            <img src="/assets/amazmanuos-logo-color.png" alt="Amaz-ManuOS" className="h-16 object-contain dark:hidden" />
            <img src="/assets/amazmanuos-logo-white.png" alt="Amaz-ManuOS" className="h-16 object-contain hidden dark:block" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Operations Portal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Secure Access for Authorized Personnel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-400 group-focus-within:text-bc-green transition-colors" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-green focus:border-bc-green sm:text-sm p-3 border dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 transition-all shadow-sm"
                placeholder="Enter your ID"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="w-5 h-5 text-gray-400 group-focus-within:text-bc-green transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-green focus:border-bc-green sm:text-sm p-3 border dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md dark:bg-red-900/30 animate-fade-in">
              <p className="text-red-700 text-sm font-medium dark:text-red-300">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full justify-center py-3.5 text-lg shadow-lg hover:shadow-xl transform transition-all active:scale-[0.99] font-bold bg-gradient-to-r from-bc-green to-emerald-700 border-none">
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Demo Credentials: admin / admin</p>
        </div>
      </div>

      <div className="absolute bottom-4 text-white/60 text-xs">
        &copy; 2024 Amaz-ManuOS. All rights reserved.
      </div>
    </div>
  );
};

export default LoginView;