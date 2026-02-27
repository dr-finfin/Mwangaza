/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X, LogOut, ChevronUp, UserPlus, Users, Sun, Moon } from 'lucide-react';
import NavLinks from './NavLinks';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MwangazaIcon from './MwangazaIcon';
import { useState, useEffect } from 'react';


type View = 'lessons' | 'projects' | 'quizzes' | 'progress';

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  isCollapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
  userEmail: string;
}

export default function Sidebar({ activeView, onNavigate, isCollapsed, onToggle, onLogout, userEmail }: SidebarProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState<string[]>([]);
  

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem('savedAccounts') || '[]');
    if (userEmail && !accounts.includes(userEmail)) {
      const updated = [...accounts, userEmail];
      localStorage.setItem('savedAccounts', JSON.stringify(updated));
      setSavedAccounts(updated);
    } else {
      setSavedAccounts(accounts);
    }
  }, [userEmail]);

  const handleSwitchAccount = (email: string) => {
    if (email === userEmail) return;
    // In a real app, we'd need the token for this account.
    // For now, we'll just log out so they can log in as the other user.
    onLogout();
  };

  const AccountSection = () => (
    <div className="mt-auto border-t border-blue-800 pt-4 relative">
      {isAccountMenuOpen && (
        <div className={`absolute bottom-full left-0 w-full bg-blue-800 rounded-xl shadow-2xl mb-2 overflow-hidden border border-blue-700 z-50 transition-all duration-200`}>
          
          <button 
            onClick={() => {
              setShowSwitchModal(true);
              setIsAccountMenuOpen(false);
            }}
            className="w-full flex items-center p-3 hover:bg-blue-700 transition text-slate-200 hover:text-white space-x-3 border-b border-blue-700"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Switch Account</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center p-3 hover:bg-red-600 transition text-slate-200 hover:text-white space-x-3"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      )}

      <button 
        onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
        className={`w-full flex items-center p-2 rounded-xl hover:bg-blue-800 transition ${isCollapsed ? 'justify-center' : 'space-x-3'} ${isAccountMenuOpen ? 'bg-blue-800' : ''}`}
      >
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 shrink-0 shadow-sm">
          <span className="font-bold text-lg">{userEmail ? userEmail[0].toUpperCase() : 'U'}</span>
        </div>
        {!isCollapsed && (
          <>
            <div className="overflow-hidden flex-grow text-left">
              <p className="text-sm font-bold truncate text-yellow-400">{userEmail || 'Learner'}</p>
              <p className="text-xs text-blue-300">Student Account</p>
            </div>
            <ChevronUp className={`w-4 h-4 text-blue-400 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {showSwitchModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-blue-50">
              <h3 className="text-xl font-bold text-blue-900">Switch Account</h3>
              <button onClick={() => setShowSwitchModal(false)} className="text-slate-400 hover:text-blue-900 transition p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {savedAccounts.map((email) => (
                  <button
                    key={email}
                    onClick={() => handleSwitchAccount(email)}
                    className={`w-full flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                      email === userEmail 
                        ? 'border-yellow-400 bg-yellow-50' 
                        : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-yellow-400 mr-4 shrink-0">
                      <span className="font-bold">{email[0].toUpperCase()}</span>
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="font-bold text-blue-900 truncate">{email}</p>
                      {email === userEmail && <p className="text-xs text-yellow-600 font-medium">Currently Active</p>}
                    </div>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={onLogout}
                className="w-full mt-6 flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-bold"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add Another Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <aside className={`bg-blue-900 text-white flex flex-col p-4 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <button onClick={onToggle} className={`w-full flex items-center mb-8 p-2 rounded-lg hover:bg-blue-800 transition ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <MwangazaIcon className={`w-8 h-8 text-yellow-400 ${!isCollapsed ? 'mr-2' : ''}`} />
          {!isCollapsed && <span className="text-2xl font-bold text-yellow-400">Mwangaza</span>}
        </button>
        <nav className="flex-grow">
          <NavLinks activeView={activeView} onNavigate={onNavigate} isCollapsed={isCollapsed} />
        </nav>
        <AccountSection />
      </aside>
    );
  }

  // Mobile view
  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} onClick={onToggle}></div>
      <aside className={`fixed top-0 left-0 h-full bg-blue-900 text-white flex flex-col p-4 transition-transform duration-300 z-50 w-64 ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <MwangazaIcon className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-2xl font-bold text-yellow-400">Mwangaza</span>
          </div>
          <button onClick={onToggle} className="p-2 rounded-lg hover:bg-blue-800 transition">
            <X />
          </button>
        </div>
        <nav className="flex-grow">
          <NavLinks activeView={activeView} onNavigate={onNavigate} isCollapsed={false} />
        </nav>
        <AccountSection />
      </aside>
    </>
  );
}
