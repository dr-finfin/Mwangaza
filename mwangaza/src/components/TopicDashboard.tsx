/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { categories, SubTopic, CategoryWithGrades, LearningContent, Topic } from '../data';

import { ClipboardCheck, DraftingCompass, TrendingUp } from 'lucide-react';
import FunFactCard from './FunFactCard';
import DashboardLinkCard from './DashboardLinkCard';

type View = 'lessons' | 'projects' | 'quizzes' | 'progress';

interface TopicDashboardProps {
  onSubTopicSelect: (subTopic: SubTopic, topicName: string) => void;
  onNavigate: (view: View) => void;
}

export default function TopicDashboard({ onSubTopicSelect, onNavigate }: TopicDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithGrades | null>(null);
  const [selectedGradeContent, setSelectedGradeContent] = useState<LearningContent | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const renderContent = () => {
    // Level 4: Display Sub-Topics
    if (selectedTopic) {
      return (
        <div>
          <button onClick={() => setSelectedTopic(null)} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Topics
          </button>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">{selectedTopic.name} - Sub-Topics</h1>
          <div className="space-y-3">
            {selectedTopic.subTopics.map(subTopic => (
              <div key={subTopic.name}
                className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition"
                onClick={() => onSubTopicSelect(subTopic, selectedTopic.name)}>
                <p className="text-lg text-blue-800 dark:text-blue-400">{subTopic.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Level 3: Display Topics
    if (selectedGradeContent) {
      return (
        <div>
          <button onClick={() => setSelectedGradeContent(null)} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Grades
          </button>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">{selectedCategory!.name} - {selectedGradeContent.grade}</h1>
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Topics</h2>
          <div className="space-y-3">
            {selectedGradeContent.topics.map(topic => (
              <div key={topic.name}
                className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition"
                onClick={() => setSelectedTopic(topic)}>
                <p className="text-lg text-blue-800 dark:text-blue-400">{topic.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Level 2: Display Grades
    if (selectedCategory) {
      return (
        <div>
          <button onClick={() => setSelectedCategory(null)} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Categories
          </button>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">{selectedCategory.name} - Select a Grade</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedCategory.contentByGrade.map((content) => (
              <div key={content.grade}
                className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center border-4 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500"
                onClick={() => setSelectedGradeContent(content)}>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-400">{content.grade}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Level 1: Display Categories (Default View)
    return (
      <>
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8">Jambo! Welcome to Mwangaza.</h1>
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Start a Lesson: Select a Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <div key={category.name}
              className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center border-4 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500"
              onClick={() => setSelectedCategory(category)}>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                <category.icon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />
              </div>
              <h2 className="text-xl sm:text-2xl text-center font-bold text-blue-900 dark:text-blue-400">{category.name}</h2>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4 mt-12">Explore & Engage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FunFactCard />
          <DashboardLinkCard 
            title="Daily Quiz"
            description="Test your knowledge with a quick general knowledge quiz."
            icon={<ClipboardCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            onClick={() => onNavigate('quizzes')}
          />
          <DashboardLinkCard 
            title="Fun Projects"
            description="Get hands-on with practical projects for all subjects."
            icon={<DraftingCompass className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            onClick={() => onNavigate('projects')}
          />
          <DashboardLinkCard 
            title="Track Your Progress"
            description="See how you're doing and what you've accomplished."
            icon={<TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            onClick={() => onNavigate('progress')}
          />
        </div>
      </>
    );
  };

  return <div className="p-8">{renderContent()}</div>;
}
