/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LessonActivity, TestResult } from '../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProgressDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lessons'>('dashboard');
  const [progressData, setProgressData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/progress', {
          headers: {
            'x-auth-token': token || '',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setProgressData(data);
        }
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  // For display, we'll use the data from the database.
  // We'll assume lesson_id corresponds to some mapping or just use names if we store names.
  // Let's assume for this demo that we're storing lesson names in the lesson_id field as strings for simplicity,
  // or we'll just show what we have.
  
  const completedLessons = progressData.filter(p => p.completed).length;
  const totalLessons = 15; // Placeholder for total lessons in the curriculum
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const testResults = progressData
    .filter(p => p.score !== null)
    .map(p => ({
      name: p.lesson_name || `Lesson ${p.lesson_id}`,
      score: p.score
    }));

  const gridColor = '#e2e8f0';
  const axisColor = '#64748b';
  const tooltipBg = '#ffffff';
  const tooltipText = '#1e293b';

  const renderDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Test Results</h2>
        {testResults.length > 0 ? (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={testResults} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={axisColor} />
                <YAxis stroke={axisColor} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '8px', color: tooltipText, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: tooltipText }}
                />
                <Bar dataKey="score" fill="#8884d8">
                  {testResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-400 italic">
            No test results yet. Complete a quiz to see your scores!
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Lessons Completed</h2>
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-slate-200"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-blue-600"
              strokeDasharray={`${completionPercentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-slate-800">{completionPercentage}%</span>
          </div>
        </div>
        <p className="mt-4 text-lg text-slate-600">{completedLessons} of {totalLessons} lessons</p>
      </div>

      <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Your Learning Journey</h2>
        <p className="text-slate-600">
          {completedLessons === 0 
            ? "You haven't started any lessons yet. Head over to 'My Lessons' to begin!" 
            : `Great job! You've completed ${completedLessons} lessons so far. Keep it up!`}
        </p>
      </div>
    </div>
  );

  const renderMyLessons = () => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">Your Activity</h2>
      {progressData.length > 0 ? (
        <ul className="space-y-3">
          {progressData.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
              <span className="text-slate-600 font-medium">{item.lesson_name || `Lesson ${item.lesson_id}`}</span>
              <div className="flex items-center space-x-4">
                {item.score !== null && (
                  <span className="text-sm font-bold text-blue-600">Score: {item.score}%</span>
                )}
                {item.completed ? (
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-100 px-2 py-1 rounded-full">COMPLETED</span>
                ) : (
                  <span className="text-xs font-bold text-amber-500 bg-amber-100 px-2 py-1 rounded-full">IN PROGRESS</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-8 text-center text-slate-400 italic">
          No activity recorded yet.
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans transition-colors duration-200">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Your Progress</h1>

      <div className="mb-8 border-b border-slate-200">
        <nav className="-mb-px flex space-x-6">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'dashboard' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'lessons' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
            My Lessons
          </button>
        </nav>
      </div>

      {activeTab === 'dashboard' ? renderDashboard() : renderMyLessons()}
    </div>
  );
};

export default ProgressDashboard;
