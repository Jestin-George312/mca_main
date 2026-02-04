import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';

// Context
import { AuthProvider } from './context/AuthContext';

// Layout
import PrivateRoute from './components/common/PrivateRoute';
import MainLayout from './components/common/Layout/MainLayout';

// Pages (eager load common ones)
import Login from './pages/auth/Login';
import Landing from './pages/Landing';
import StudentDashboard from './pages/student/Dashboard';

// Lazy load less common pages
const StudentTopicSubmission = lazy(() => import('./pages/student/TopicSubmission'));
const StudentTaskBoard = lazy(() => import('./pages/student/TaskBoard'));
const StudentDocuments = lazy(() => import('./pages/student/Documents'));
const StudentChat = lazy(() => import('./pages/student/Chat'));
const StudentMeetings = lazy(() => import('./pages/student/Meetings'));
const GuideDashboard = lazy(() => import('./pages/guide/Dashboard'));
const ProjectRequests = lazy(() => import('./pages/guide/ProjectRequests'));
const GuideChat = lazy(() => import('./pages/guide/Chat'));
const GuideMeetings = lazy(() => import('./pages/guide/Meetings'));
const CoordinatorDashboard = lazy(() => import('./pages/coordinator/Dashboard'));
const GuideAllocation = lazy(() => import('./pages/coordinator/GuideAllocation'));
const RubricBuilder = lazy(() => import('./pages/coordinator/RubricBuilder'));

// Shared pages
const Profile = lazy(() => import('./pages/shared/Profile'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                {/* Dashboard - default after login */}
                <Route path="/dashboard" element={<StudentDashboard />} />

                {/* Student Routes */}
                <Route path="/student">
                  <Route index element={<Navigate to="/student/dashboard" replace />} />
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="submit-topic" element={<StudentTopicSubmission />} />
                  <Route path="tasks" element={<StudentTaskBoard />} />
                  <Route path="documents" element={<StudentDocuments />} />
                  <Route path="chat" element={<StudentChat />} />
                  <Route path="meetings" element={<StudentMeetings />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Guide Routes */}
                <Route path="/guide">
                  <Route index element={<Navigate to="/guide/dashboard" replace />} />
                  <Route path="dashboard" element={<GuideDashboard />} />
                  <Route path="requests" element={<ProjectRequests />} />
                  <Route path="chat" element={<GuideChat />} />
                  <Route path="meetings" element={<GuideMeetings />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Coordinator Routes */}
                <Route path="/coordinator">
                  <Route index element={<Navigate to="/coordinator/dashboard" replace />} />
                  <Route path="dashboard" element={<CoordinatorDashboard />} />
                  <Route path="allocation" element={<GuideAllocation />} />
                  <Route path="rubrics" element={<RubricBuilder />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;