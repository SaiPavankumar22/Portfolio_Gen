import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PortfoliosDashboard from './pages/PortfoliosDashboard';
import ProfilePage from './pages/ProfilePage';
import PortfolioCreationWizard from './pages/PortfolioCreationWizard';
import GeneratedPortfolio from './components/GeneratedPortfolio';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage onGetStarted={() => window.location.href = '/login'} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected Routes */}
              <Route path="/portfolios" element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }>
                <Route index element={<PortfoliosDashboard />} />
              </Route>
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }>
                <Route index element={<ProfilePage />} />
              </Route>
              
              <Route path="/create-portfolio" element={
                <ProtectedRoute>
                  <PortfolioCreationWizard />
                </ProtectedRoute>
              } />
              
              <Route path="/generated-portfolio/:id" element={
                <ProtectedRoute>
                  <GeneratedPortfolio 
                    userProfile={{} as any}
                    userPersonality={{} as any}
                    selectedTemplate=""
                    onBackToWizard={() => {}}
                  />
                </ProtectedRoute>
              } />
              
              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;