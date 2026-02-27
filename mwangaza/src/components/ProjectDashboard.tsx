import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { categories, Project, CategoryWithGrades, LearningContent, Topic, SubTopic } from '../data';
import ProjectSelectionPage from './ProjectSelectionPage';

interface ProjectDashboardProps {
  onProjectSelect: (project: Project) => void;
}

export default function ProjectDashboard({ onProjectSelect }: ProjectDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithGrades | null>(null);
  const [selectedGradeContent, setSelectedGradeContent] = useState<LearningContent | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | null>(null);

  const renderContent = () => {
    if (selectedSubTopic) {
      return (
        <ProjectSelectionPage 
          subTopic={selectedSubTopic}
          onProjectSelect={onProjectSelect}
          onBack={() => setSelectedSubTopic(null)}
        />
      );
    }

    if (selectedTopic) {
      const subTopicsWithProjects = selectedTopic.subTopics.filter(sub => sub.projects && sub.projects.length > 0);
      return (
        <div>
          <button onClick={() => setSelectedTopic(null)} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Topics
          </button>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">{selectedTopic.name} - Sub-Topics</h1>
          <div className="space-y-3">
            {subTopicsWithProjects.map((sub) => (
              <div 
                key={sub.name} 
                className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition border-l-4 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500"
                onClick={() => setSelectedSubTopic(sub)}>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400">{sub.name}</h3>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedGradeContent) {
      const topicsWithProjects = selectedGradeContent.topics.filter(topic => 
        topic.subTopics.some(sub => sub.projects && sub.projects.length > 0)
      );
      return (
        <div>
          <button onClick={() => setSelectedGradeContent(null)} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Grades
          </button>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">{selectedCategory!.name} - {selectedGradeContent.grade}</h1>
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Topics with Projects</h2>
          <div className="space-y-3">
            {topicsWithProjects.map((topic) => (
              <div 
                key={topic.name} 
                className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition border-l-4 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500"
                onClick={() => setSelectedTopic(topic)}>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400">{topic.name}</h3>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedCategory) {
      return (
        <div>
          <button onClick={() => setSelectedCategory(null)} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Categories
          </button>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">{selectedCategory.name} - Select a Grade</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

    return (
      <>
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">Projects: Select a Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.name}
              className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center border-4 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500"
              onClick={() => setSelectedCategory(category)}>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                <category.icon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />
              </div>
              <h2 className="text-xl sm:text-2xl text-center font-bold text-blue-900 dark:text-blue-300">{category.name}</h2>
            </div>
          ))}
        </div>
      </>
    );
  };

  return <div className="p-8">{renderContent()}</div>;
}
