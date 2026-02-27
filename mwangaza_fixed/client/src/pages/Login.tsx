import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import MwangazaIcon from '../components/ui/MwangazaIcon';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      login(data.token, email);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <MwangazaIcon className="w-16 h-16 text-blue-900 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-300 mb-2">Mwangaza</h1>
        <h2 className="text-xl font-medium text-blue-800 dark:text-blue-400">Welcome Back!</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Sign in to continue learning</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl rounded-2xl border border-blue-100 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-blue-900 dark:text-blue-400 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="learner@example.com"
                className="appearance-none block w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-600 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent sm:text-sm transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-blue-900 dark:text-blue-400 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="appearance-none block w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-600 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent sm:text-sm transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
                <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-blue-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-medium">
                  New to Mwangaza?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-3 px-4 border-2 border-blue-900 dark:border-blue-400 rounded-xl text-sm font-bold text-blue-900 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                Create a New Account
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
          &copy; {new Date().getFullYear()} Mwangaza Learning. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
