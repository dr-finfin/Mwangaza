/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Video, SubTopic } from '../../data';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import SubTopicExplanation from './SubTopicExplanation';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

interface VideoPlayerProps {
  video: Video;
  subTopic: SubTopic;
  topicName: string;
  onBack: () => void;
}

export default function VideoPlayer({ video, subTopic, topicName, onBack }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const saveProgress = async () => {
      if (!token) return; // Don't save progress if not authenticated
      try {
        await api.post('/api/progress', {
          lesson_id: video.videoId,
          lesson_name: video.title,
          completed: true,
        });
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    };

    saveProgress();
  }, [video.videoId, video.title, token]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = () => {
    setIsLoading(false);
  }

  const onError = () => {
    setIsLoading(false);
    setIsError(true);
  }

  return (
    <div className="p-8 bg-blue-50 dark:bg-gray-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <button onClick={onBack} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
        <ArrowLeft className="mr-2" />
        Back to Video Selection
      </button>
      <h1 className="text-3xl font-bold text-blue-900 dark:text-gray-100 mb-2">{video.title}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{video.description}</p>
      <div className="aspect-video bg-slate-800 dark:bg-slate-900 rounded-xl mb-8 overflow-hidden relative flex items-center justify-center">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-white">
            <div className="w-12 h-12 border-4 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
            <p className="mt-4 text-lg">Loading video...</p>
          </div>
        )}
        {isError && (
          <div className="text-white flex flex-col items-center">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mb-4" />
            <p>This video is currently unavailable. Please select another one.</p>
          </div>
        )}
        <YouTube 
          videoId={video.videoId} 
          opts={opts} 
          className={`w-full h-full absolute top-0 left-0 ${isLoading || isError ? 'invisible' : 'visible'}`}
          onReady={onReady}
          onError={onError}
        />
      </div>

      <SubTopicExplanation 
        explanation={subTopic.description} 
      />
    </div>
  );
}
