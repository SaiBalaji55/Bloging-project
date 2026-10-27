import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../api/authApi.js';
import axiosClient from '../api/axiosConfig.js'; // Import your axios config to call the /me route

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // Start as true so the app waits for the token check

  // 1. Check for token and auto-login when the page refreshes
  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Call your 'me' endpoint from authController.js
          const response = await axiosClient.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          console.error("Session expired or invalid:", error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkUserSession();
  }, []);

  const login = async (formData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token);
      
      // 2. FIX: Set the user using the username from the backend response
      setUser(response.user); 
      
      return { success: true };
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message);
      return { success: false, error: error.response?.data?.message || 'Login Failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);