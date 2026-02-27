/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useMediaQuery } from './hooks/useMediaQuery';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TopicDashboard from './components/TopicDashboard';
import VideoPlayer from './components/VideoPlayer';
import ProjectDashboard from './components/ProjectDashboard';
import { SubTopic, Video, Project, Topic } from './data';
import VideoSelectionPage from './components/VideoSelectionPage';
import QuizzesDashboard from './components/QuizzesDashboard';
import ProgressDashboard from './components/ProgressDashboard';

import ProjectDetailsPage from './components/ProjectDetailsPage';
import Auth from './components/Auth';

type View = 'lessons' | 'projects' | 'quizzes' | 'progress';

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<View>('lessons');
  const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | null>(null);
  const [selectedTopicName, setSelectedTopicName] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const handleAuth = (token: string) => {
    localStorage.setItem('token', token);
    // In a real app, we'd get the email from the token or a separate API call.
    // For now, we'll just use a placeholder or assume it was passed.
    // Since I don't have the email here easily without changing Auth.tsx, 
    // I'll update Auth.tsx to pass it.
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const handleSubTopicSelect = (subTopic: SubTopic, topicName: string) => {
    setSelectedSubTopic(subTopic);
    setSelectedTopicName(topicName);
    setSelectedVideo(null);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  }

  const handleNavigate = (view: View) => {
    setActiveView(view);
    setSelectedSubTopic(null);
    setSelectedVideo(null);
    setSelectedProject(null);
  }

  const renderMainContent = () => {
    if (activeView === 'projects') {
      if (selectedProject) {
        return <ProjectDetailsPage project={selectedProject} onBack={() => setSelectedProject(null)} />;
      }
      return <ProjectDashboard onProjectSelect={handleProjectSelect} />;
    }
    if (activeView === 'quizzes') {
      return <QuizzesDashboard />;
    }
    if (activeView === 'progress') {
      return <ProgressDashboard />;
    }

    // 'lessons' view logic
    if (selectedVideo) {
      return (
        <VideoPlayer 
          video={selectedVideo} 
          subTopic={selectedSubTopic!} 
          topicName={selectedTopicName}
          onBack={() => setSelectedVideo(null)} 
        />
      );
    }
    if (selectedSubTopic) {
      return (
        <VideoSelectionPage 
          subTopic={selectedSubTopic} 
          topicName={selectedTopicName}
          onVideoSelect={handleVideoSelect} 
          onBack={() => setSelectedSubTopic(null)} 
        />
      );
    }
    return <TopicDashboard onSubTopicSelect={handleSubTopicSelect} onNavigate={handleNavigate} />;
  }

  if (!isAuthenticated) {
    return <Auth onAuth={(token, email) => {
      localStorage.setItem('userEmail', email);
      setUserEmail(email);
      handleAuth(token);
    }} />;
  }

  return (
    <div className="relative h-screen bg-blue-50 font-sans transition-colors duration-200">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      <div className="md:flex flex-grow overflow-hidden h-[calc(100vh-64px)] md:h-screen">
        <Sidebar 
          activeView={activeView} 
          onNavigate={handleNavigate} 
          isCollapsed={isDesktopSidebarCollapsed}
          onToggle={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
          onLogout={handleLogout}
          userEmail={userEmail}
        />
        {isMobileMenuOpen && !isDesktop && (
          <div className="fixed inset-0 z-40">
            <Sidebar 
              activeView={activeView} 
              onNavigate={(view) => { handleNavigate(view); setIsMobileMenuOpen(false); }}
              isCollapsed={false}
              onToggle={() => setIsMobileMenuOpen(false)}
              onLogout={handleLogout}
              userEmail={userEmail}
            />
          </div>
        )}
      <main className="flex-grow overflow-y-auto bg-blue-50">
        {renderMainContent()}
      </main>
      </div>
    </div>
  );
}
