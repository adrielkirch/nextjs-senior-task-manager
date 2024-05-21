import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface TypographyViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
}

export const useDataViewModel = (): TypographyViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const router = useRouter();

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      router.push('/pages/login/');
    } else {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    checkAuthentication,
  };
};
