import { createContext, useState, useContext } from 'react';
import { dummyUser } from '../dummyData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Toggle this to true to see the logged-in state across the app
  const [user, setUser] = useState(null); 

  const login = () => {
    setUser(dummyUser);
    localStorage.setItem('token', 'fake-jwt-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);