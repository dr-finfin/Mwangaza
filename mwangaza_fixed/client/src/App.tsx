import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import TopicDashboard from './pages/TopicDashboard';
import Topic from './pages/Topic';
import QuizzesDashboard from './components/features/QuizzesDashboard';
import ProgressDashboard from './components/features/ProgressDashboard';
import ProjectDashboard from './components/features/ProjectDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ui/ProtectedRoute';
import PublicRoute from './components/ui/PublicRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Protected routes — must be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<TopicDashboard />} />
            <Route path="topics" element={<Topic />} />
            <Route path="quiz" element={<QuizzesDashboard />} />
            <Route path="progress" element={<ProgressDashboard />} />
            <Route path="projects" element={<ProjectDashboard />} />
          </Route>
        </Route>

        {/* Public routes — redirect to / if already logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
