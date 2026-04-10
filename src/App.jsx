import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/landing/LandingPage';
import LoadingScreen from './components/ui/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CurriculumNavigator from './components/curriculum/CurriculumNavigator';
import ProgressView from './components/dashboard/ProgressView';
import ProfileView from './components/dashboard/ProfileView';
import ExploreView from './components/explore/ExploreView';
import Notification from './components/ui/Notification';

const AppShell = () => {
  const { user, loading } = useAuth();
  const { currentView, setCurrentView, notification, darkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) return <LoadingScreen />;

  // Public landing page — no auth required
  if (!user && currentView === 'landing') {
    return <LandingPage />;
  }

  // Public explore page — no auth required
  if (!user && currentView === 'explore') {
    return (
      <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
        <PublicNav onSignIn={() => setCurrentView('landing')} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <ExploreView />
        </div>
        <Notification notification={notification} />
      </div>
    );
  }

  // If not signed in, show landing
  if (!user) {
    return <LandingPage />;
  }

  // Authenticated app
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'curriculum':
        return <CurriculumNavigator />;
      case 'progress':
        return <ProgressView />;
      case 'profile':
        return <ProfileView />;
      case 'explore':
        return <ExploreView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${
        darkMode ? 'dark' : ''
      }`}
    >
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <Navbar onMenuToggle={() => setMobileMenuOpen((prev) => !prev)} />
      <main className="lg:ml-64 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderView()}
        </div>
      </main>
      <Notification notification={notification} />
    </div>
  );
};

// Simple public navbar
const PublicNav = ({ onSignIn }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-black">M</span>
        </div>
        <span className="font-black text-gray-900 text-lg tracking-tight">
          MWANGAZA
        </span>
      </div>
      <button
        onClick={onSignIn}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold 
                   rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign In
      </button>
    </div>
  </nav>
);

const App = () => (
  <AuthProvider>
    <AppProvider>
      <AppShell />
    </AppProvider>
  </AuthProvider>
);

export default App;
