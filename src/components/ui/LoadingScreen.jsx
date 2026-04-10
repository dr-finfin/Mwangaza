import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex flex-col items-center justify-center z-50">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-gold">
            <span className="text-5xl">☀️</span>
          </div>
          <div className="absolute -inset-2 bg-gold-400/20 rounded-3xl blur-lg animate-pulse" />
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tight">
            MWANGAZA
          </h1>
          <p className="text-blue-200 text-lg font-medium mt-1">
            Illuminate Your Learning
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-300 rounded-full"
            style={{
              animation: 'loadBar 1.8s ease-in-out infinite',
            }}
          />
        </div>

        <p className="text-blue-200 text-sm">Loading{dots}</p>
      </div>

      <style>{`
        @keyframes loadBar {
          0%   { width: 0%; margin-left: 0%; }
          50%  { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
