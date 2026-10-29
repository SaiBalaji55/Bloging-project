import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../api/authApi.js';
import axiosClient from '../api/axiosConfig.js'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosClient.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          console.error("Session expired or invalid:", error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      // Finished checking (whether successful or not)
      setIsLoading(false);
    };

    checkUserSession();
  }, []);

  const login = async (formData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token);
      
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
      {/* FIX: Only render the app once the token check is completely finished */}
      {!isLoading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
           <div className="text-gray-500 font-medium">Loading session...</div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);