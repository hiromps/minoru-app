import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock user data for demonstration
const MOCK_USER: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // In a real app, this would verify token from secure storage
        // For demo, we'll use a timeout to simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (isMounted) {
          setUser(null); // Start with no user
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, validate credentials and get tokens
      // For demo purposes, allow any non-empty values and use mock user
      if (email.trim() === '' || password.trim() === '') {
        throw new Error('Email and password are required');
      }
      
      setUser(MOCK_USER);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);