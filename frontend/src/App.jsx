
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import MyCourses from './pages/MyCourses';
import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <ErrorBoundary>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CourseDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
