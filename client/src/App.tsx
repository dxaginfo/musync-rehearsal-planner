import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import BandList from './pages/bands/BandList';
import BandDetails from './pages/bands/BandDetails';
import RehearsalCalendar from './pages/rehearsals/RehearsalCalendar';
import RehearsalDetails from './pages/rehearsals/RehearsalDetails';
import UserProfile from './pages/profile/UserProfile';
import NotFound from './pages/NotFound';

// Auth-related components
import PrivateRoute from './components/auth/PrivateRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Auth routes with AuthLayout */}
            <Route element={<AuthLayout />}>
              <Route path="/auth">
                <Route 
                  path="login" 
                  element={
                    <PublicOnlyRoute>
                      <Login />
                    </PublicOnlyRoute>
                  } 
                />
                <Route 
                  path="register" 
                  element={
                    <PublicOnlyRoute>
                      <Register />
                    </PublicOnlyRoute>
                  } 
                />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
            </Route>

            {/* Main app routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/bands" 
                element={
                  <PrivateRoute>
                    <BandList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/bands/:bandId" 
                element={
                  <PrivateRoute>
                    <BandDetails />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/rehearsals" 
                element={
                  <PrivateRoute>
                    <RehearsalCalendar />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/rehearsals/:rehearsalId" 
                element={
                  <PrivateRoute>
                    <RehearsalDetails />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                } 
              />
            </Route>

            {/* Redirects and fallbacks */}
            <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;