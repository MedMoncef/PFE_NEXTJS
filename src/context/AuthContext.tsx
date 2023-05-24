import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  authToken: string | null;
  login: (email: string, password: string) => void;
  register: (
    nom: string,
    prenom: string,
    dateN: string, // Update the type to string
    email: string,
    password: string,
    confirmPassword: string,
    id_post: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  authToken: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Check authentication state after page refresh to get the token inside the useAuthContext
  const checkAuthState = () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:7000/user',
        { email, password }
      );
      const { auth_token } = response.data;
      setAuthToken(auth_token);
      setIsLoggedIn(true);
      localStorage.setItem('authToken', auth_token);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, show error message, etc.
    }
  };

  const register = async (nom: string, prenom: string, dateN: string, email: string, password: string, confirmPassword: string, id_post: string) => {
    try {
      const response = await axios.post('http://localhost:7000/create_user', {
        nom,
        prenom,
        dateN,
        email,
        password,
        confirmPassword,
        id_post
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, show error message, etc.
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};