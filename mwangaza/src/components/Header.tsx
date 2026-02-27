import React from 'react';
import { Menu } from 'lucide-react';
import MwangazaIcon from './MwangazaIcon';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-blue-900 text-white shadow-md">
      <div className="flex items-center">
        <MwangazaIcon className="w-8 h-8 text-yellow-400 mr-2" />
        <span className="text-2xl font-bold text-yellow-400">Mwangaza</span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-blue-800 transition">
          <Menu />
        </button>
      </div>
    </header>
  );
};

export default Header;
