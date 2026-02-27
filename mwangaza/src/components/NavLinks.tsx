import React from 'react';
import { BookOpen, DraftingCompass, ClipboardCheck, TrendingUp } from 'lucide-react';

type View = 'lessons' | 'projects' | 'quizzes' | 'progress';

interface NavLinksProps {
  activeView: View;
  onNavigate: (view: View) => void;
  isCollapsed: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ activeView, onNavigate, isCollapsed }) => {
  return (
    <ul>
      <li className="mb-4">
        <button 
          onClick={() => onNavigate('lessons')}
          className={`w-full flex items-center p-2 rounded-lg transition text-left ${activeView === 'lessons' ? 'bg-blue-800 text-yellow-400 font-bold' : 'hover:bg-blue-800'} ${isCollapsed ? 'justify-center' : ''}`}>
          <BookOpen className={!isCollapsed ? 'mr-3' : ''} />
          {!isCollapsed && <span>My Lessons</span>}
        </button>
      </li>
      <li className="mb-4">
        <button 
          onClick={() => onNavigate('projects')}
          className={`w-full flex items-center p-2 rounded-lg transition text-left ${activeView === 'projects' ? 'bg-blue-800 text-yellow-400 font-bold' : 'hover:bg-blue-800'} ${isCollapsed ? 'justify-center' : ''}`}>
          <DraftingCompass className={!isCollapsed ? 'mr-3' : ''} />
          {!isCollapsed && <span>Projects</span>}
        </button>
      </li>
      <li className="mb-4">
        <button 
          onClick={() => onNavigate('quizzes')}
          className={`w-full flex items-center p-2 rounded-lg transition text-left ${activeView === 'quizzes' ? 'bg-blue-800 text-yellow-400 font-bold' : 'hover:bg-blue-800'} ${isCollapsed ? 'justify-center' : ''}`}>
          <ClipboardCheck className={!isCollapsed ? 'mr-3' : ''} />
          {!isCollapsed && <span>Quizzes</span>}
        </button>
      </li>
      <li>
        <button 
          onClick={() => onNavigate('progress')}
          className={`w-full flex items-center p-2 rounded-lg transition text-left ${activeView === 'progress' ? 'bg-blue-800 text-yellow-400 font-bold' : 'hover:bg-blue-800'} ${isCollapsed ? 'justify-center' : ''}`}>
          <TrendingUp className={!isCollapsed ? 'mr-3' : ''} />
          {!isCollapsed && <span>Progress</span>}
        </button>
      </li>
    </ul>
  );
};

export default NavLinks;
