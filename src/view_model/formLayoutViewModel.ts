import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface FormLayoutViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
}

export const useDataViewModel = (): FormLayoutViewModelProps => {
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
