import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import MwangazaIcon from '../ui/MwangazaIcon';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-blue-900 dark:bg-gray-800 text-white shadow-md">
      <div className="flex items-center">
        <MwangazaIcon className="w-8 h-8 text-yellow-400 mr-2" />
        <span className="text-2xl font-bold text-yellow-400">Mwangaza</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-blue-800 dark:hover:bg-gray-700 transition"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-300" />}
        </button>
        <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-blue-800 dark:hover:bg-gray-700 transition">
          <Menu />
        </button>
      </div>
    </header>
  );
};

export default Header;
