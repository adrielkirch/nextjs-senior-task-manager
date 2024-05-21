import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import login from 'src/requests/user/login.user.request';

export interface LoginViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  handleLogin: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const useDataViewModel = (): LoginViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('adriel.kirch.1@hotmail.com');
  const [password, setPassword] = useState<string>('Zxycok159!');
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

  const handleLogin = async () => {
    alert('handleLogin');
    try {
      await login(email, password);
      setIsAuthenticated(true);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return {
    isAuthenticated,
    checkAuthentication,
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
  };
};
