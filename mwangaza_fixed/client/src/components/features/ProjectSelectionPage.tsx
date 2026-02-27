/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubTopic, Project } from '../../data';
import { ArrowLeft } from 'lucide-react';

interface ProjectSelectionPageProps {
  subTopic: SubTopic;
  onProjectSelect: (project: Project) => void;
  onBack: () => void;
}

export default function ProjectSelectionPage({ subTopic, onProjectSelect, onBack }: ProjectSelectionPageProps) {
  return (
    <div className="p-8 bg-blue-50 dark:bg-gray-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <button onClick={onBack} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
        <ArrowLeft className="mr-2" />
        Back to Sub-Topics
      </button>
      <h1 className="text-3xl font-bold text-blue-900 dark:text-gray-100 mb-6">{subTopic.name} Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subTopic.projects.map((project) => (
          <div 
            key={project.title} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition border-2 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500 flex flex-col justify-between"
            onClick={() => onProjectSelect(project)}>
            <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400">{project.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
