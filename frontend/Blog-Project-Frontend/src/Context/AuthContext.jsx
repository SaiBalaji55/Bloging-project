import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../api/authApi.js';
import axiosClient from '../api/axiosConfig.js'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initialize user from localStorage so it loads instantly on refresh
 const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      // Only parse if the data exists and is not the string "undefined"
      return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.log(error)
      // If parsing fails, clear the corrupted data and default to null
      localStorage.removeItem('user');
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosClient.get('/auth/me');
          // 2. Merge backend data with local storage so we don't lose the picture
          setUser((prevUser) => {
            const updatedUser = { ...prevUser, ...response.data.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
          });
        } catch (error) {
          console.error("Session expired or invalid:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user'); // Clear user on error
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
      
      // 3. Save user to localStorage during login
      localStorage.setItem('user', JSON.stringify(response.user));
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
    localStorage.removeItem('user'); // 4. Clear user on logout
  };

  const updateUserProfileContext = (newUpdates) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...newUpdates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading, updateUserProfileContext }}>
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