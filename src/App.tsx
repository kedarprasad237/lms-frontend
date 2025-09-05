import React, { useEffect, useRef } from 'react'; // React hooks
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getCurrentUser } from './store/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import LandingPage from './components/landing/LandingPage';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import VerifyEmail from './components/auth/VerifyEmail';
import Dashboard from './components/dashboard/Dashboard';
import Topics from './components/topics/Topics';
import Progress from './components/progress/Progress';

import LoadingSpinner from './components/common/LoadingSpinner';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token, loading } = useAppSelector((state) => state.auth);
  const storedToken = localStorage.getItem('token');
  
  // If still loading, show loading spinner
  if (loading) {
    return <LoadingSpinner message="Authenticating..." />;
  }
  
  // Check both Redux token and localStorage token
  const hasToken = token || storedToken;
  
  // If no token, redirect to login
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }
  
  // If token exists but no user yet, show loading (user is being fetched)
  if (hasToken && !user) {
    return <LoadingSpinner message="Loading user data..." />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const storedToken = localStorage.getItem('token');
  
  const hasToken = token || storedToken;
  
  if (hasToken && user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Main App Component
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, user, token } = useAppSelector((state) => state.auth);
  const hasFetchedUser = useRef(false);
  const [isInitializing, setIsInitializing] = React.useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      console.log('Initializing auth with token:', storedToken ? 'exists' : 'missing');
      console.log('Current user state:', user);
      console.log('Redux token state:', token);
      
      // If we have a token in localStorage but no user, fetch user data
      if (storedToken && !user && !hasFetchedUser.current) {
        hasFetchedUser.current = true;
        console.log('Fetching current user...');
        try {
          const result = await dispatch(getCurrentUser()).unwrap();
          console.log('User fetched successfully:', result);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          // Token is invalid, clear it
          localStorage.removeItem('token');
          hasFetchedUser.current = false;
        }
      } else if (!storedToken) {
        console.log('No token found, user should be logged out');
        hasFetchedUser.current = false;
      }
      
      setIsInitializing(false);
    };

    initializeAuth();
  }, [dispatch, user, token]);

  // Show loading spinner while initializing or loading
  if (isInitializing || loading) {
    return <LoadingSpinner message="Initializing..." />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topics"
          element={
            <ProtectedRoute>
              <Navbar />
              <Topics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Navbar />
              <Progress />
            </ProtectedRoute>
          }
        />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Default redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </Provider>
  );
};

export default App;