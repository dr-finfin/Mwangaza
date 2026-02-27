/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubTopic, Video } from '../data';
import { ArrowLeft } from 'lucide-react';
import SubTopicExplanation from './SubTopicExplanation';

interface VideoSelectionPageProps {
  subTopic: SubTopic;
  topicName: string;
  onVideoSelect: (video: Video) => void;
  onBack: () => void;
}

export default function VideoSelectionPage({ subTopic, topicName, onVideoSelect, onBack }: VideoSelectionPageProps) {
  return (
    <div className="p-8">
      <button onClick={onBack} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
        <ArrowLeft className="mr-2" />
        Back to Sub-Topics
      </button>
      <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-2">{subTopic.name}</h1>
      
      <SubTopicExplanation 
        subTopicName={subTopic.name} 
        topicName={topicName} 
        staticDescription={subTopic.description} 
      />

      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Select a Lesson Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subTopic.videos.map((video) => (
          <div 
            key={video.videoId} 
            className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition border-2 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500 flex flex-col justify-between"
            onClick={() => onVideoSelect(video)}>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400">{video.title}</h2>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${video.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : video.level === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                {video.level}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-1 pr-24">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
