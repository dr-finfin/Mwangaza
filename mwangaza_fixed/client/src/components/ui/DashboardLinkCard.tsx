import { ReactNode } from 'react';

interface DashboardLinkCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function DashboardLinkCard({ title, description, icon, onClick }: DashboardLinkCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500"
    >
      <div className="flex items-start">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-300 mb-1">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}
