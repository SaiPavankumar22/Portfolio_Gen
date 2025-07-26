import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { dummyUserProfile } from '../data/dummyData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: any;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Try to auto-login if user info is in sessionStorage (for demo, you can improve this with JWT)
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      login(email, '');
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate authentication (add real auth if needed)
    try {
      const res = await fetch(`${API_URL}/api/profile/${email}`);
      if (!res.ok) throw new Error('User not found');
      const profile = await res.json();
      setIsAuthenticated(true);
      setCurrentUser({ email });
      setUserProfile(profile);
      sessionStorage.setItem('email', email);
    } catch (err) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setUserProfile(null);
      sessionStorage.removeItem('email');
      throw err;
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    // Create new user profile
    const newProfile: UserProfile = {
      ...dummyUserProfile,
      personalInfo: {
        ...dummyUserProfile.personalInfo,
        fullName: fullName,
        email: email,
        phone: '',
        location: '',
        professionalTitle: '',
        summary: '',
        profilePicture: '',
        resume: ''
      },
      skills: [],
      experience: [],
      education: [],
      projects: [],
      interests: []
    };
    const res = await fetch(`${API_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfile),
    });
    if (!res.ok) throw new Error('Signup failed');
    const profile = await res.json();
    setIsAuthenticated(true);
    setCurrentUser({ email });
    setUserProfile(profile);
    sessionStorage.setItem('email', email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserProfile(null);
    sessionStorage.removeItem('email');
  };

  const updateProfile = async (profile: UserProfile) => {
    const res = await fetch(`${API_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error('Profile update failed');
    const updated = await res.json();
    setUserProfile(updated);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser,
      userProfile,
      login,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};