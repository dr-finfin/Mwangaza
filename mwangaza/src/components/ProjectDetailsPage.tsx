/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Project } from '../data';
import { ArrowLeft, CheckSquare, Sparkles } from 'lucide-react';
import { generateProjectGuide } from '../services/geminiService';

interface ProjectDetailsPageProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetailsPage({ project, onBack }: ProjectDetailsPageProps) {
  const [guide, setGuide] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateGuide = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedGuide = await generateProjectGuide(project);
      setGuide(generatedGuide);
    } catch (err) {
      setError('I am sorry, I was unable to generate a guide for this project. Please try again later.');
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 md:p-8">
      <button onClick={onBack} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
        <ArrowLeft className="mr-2" />
        Back to Project Selection
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-300 mb-2">{project.title}</h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8">{project.description}</p>
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Project Tasks</h2>
        <ul className="space-y-3">
          {project.tasks.map((task, index) => (
            <li key={index} className="flex items-start">
              <CheckSquare className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 text-lg">{task}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button 
          onClick={handleGenerateGuide} 
          disabled={isLoading}
          className="w-full sm:w-auto bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed">
          <Sparkles className="mr-2" />
          {isLoading ? 'Generating Guide...' : 'Generate Step-by-Step Guide'}
        </button>

        {error && <p className="text-red-600 dark:text-red-400 mt-4">{error}</p>}

        {guide && (
          <div className="mt-8 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Your Step-by-Step Guide</h2>
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <ReactMarkdown>{guide}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
