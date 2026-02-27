import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, DraftingCompass, ClipboardCheck, TrendingUp } from 'lucide-react';

interface NavLinksProps {
  isCollapsed: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isCollapsed }) => {
  const links = [
    { to: '/', icon: BookOpen, label: 'My Lessons', end: true },
    { to: '/projects', icon: DraftingCompass, label: 'Projects', end: false },
    { to: '/quiz', icon: ClipboardCheck, label: 'Quizzes', end: false },
    { to: '/progress', icon: TrendingUp, label: 'Progress', end: false },
  ];

  return (
    <ul>
      {links.map((link) => (
        <li key={link.to} className="mb-4">
          <NavLink
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `w-full flex items-center p-2 rounded-lg transition text-left ${
                isActive ? 'bg-blue-800 dark:bg-gray-700 text-yellow-400 font-bold' : 'hover:bg-blue-800 dark:hover:bg-gray-700'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            <link.icon className={!isCollapsed ? 'mr-3' : ''} />
            {!isCollapsed && <span>{link.label}</span>}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
