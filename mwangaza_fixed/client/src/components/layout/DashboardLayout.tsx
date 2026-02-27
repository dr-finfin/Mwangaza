import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const DashboardLayout: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  return (
    <div className="relative h-screen bg-blue-50 dark:bg-gray-900 font-sans transition-colors duration-200">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      <div className="md:flex flex-grow overflow-hidden h-[calc(100vh-64px)] md:h-screen">
        <Sidebar
          isCollapsed={isDesktopSidebarCollapsed}
          onToggle={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
        />
        {isMobileMenuOpen && !isDesktop && (
          <div className="fixed inset-0 z-40">
            <Sidebar
              isCollapsed={false}
              onToggle={() => setIsMobileMenuOpen(false)}
            />
          </div>
        )}
        <main className="flex-grow overflow-y-auto bg-blue-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
