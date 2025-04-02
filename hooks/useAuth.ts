import { useEffect, useState } from 'react';
import { getItemFromStorage } from '@/libs/expoSecureStore';
import { User } from '@/@types/auth';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      try {
        const [userFromStorage, tokenFromStorage] = await Promise.all([
          getItemFromStorage('user'),
          getItemFromStorage('token'),
        ]);

        setUser(userFromStorage);
        setToken(tokenFromStorage);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuth();
  }, []);

  return {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
  };
};
