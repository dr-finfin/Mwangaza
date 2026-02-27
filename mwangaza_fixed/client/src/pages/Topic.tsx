import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import SubTopicExplanation from '../components/features/SubTopicExplanation';

const Topic: React.FC = () => {
  const location = useLocation();
  const { subTopic, topicName } = location.state || {};
  const [currentTopic, setCurrentTopic] = useState<string>(subTopic?.name || '');
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (subTopic) {
      setCurrentTopic(subTopic.name);
      fetchExplanation(subTopic.name);
    }
  }, [subTopic]);

  const fetchExplanation = async (topicToExplain: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/topics/explain', { topic: topicToExplain });
      setExplanation(data.explanation);
    } catch (err) {
      console.error('Failed to get explanation', err);
      setError('Failed to load explanation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchExplanation(currentTopic);
  };

  return (
    <div className="p-8 bg-blue-50 dark:bg-gray-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <h1 className="text-4xl font-bold mb-6 text-blue-900 dark:text-yellow-400">{topicName || 'Topic'}</h1>
      <h2 className="text-2xl font-semibold mb-6 text-blue-800 dark:text-blue-300">{currentTopic}</h2>

      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-8">
        <input
          type="text"
          value={currentTopic}
          onChange={(e) => setCurrentTopic(e.target.value)}
          placeholder="Enter a topic to explain"
          className="flex-grow p-3 border border-slate-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-slate-100"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Explaining...' : 'Explain'}
        </button>
      </form>

      {loading && <p className="text-blue-600 dark:text-blue-400">Loading explanation...</p>}
      {error && <p className="text-red-600 dark:text-red-400">Error: {error}</p>}
      {explanation && <SubTopicExplanation explanation={explanation} />}
    </div>
  );
};

export default Topic;
