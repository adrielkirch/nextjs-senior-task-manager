import { MouseEvent, useEffect, useState } from 'react'
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
  isShowPassword: boolean;
  setIsShowPassword: (value: boolean) => void;
  handlePasswordChange: (value: string) => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  handleEmailChange: (value: string) => void;
}

export const useDataViewModel = (): LoginViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }
  const handleEmailChange = (value: string) => {
    setEmail(value)
  }


  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(false);
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await login({
        email,
        password
      });
      if (data) localStorage.setItem('token', data.token);
      router.push('/');

    } catch (error) {
      console.error('Login failed top:', JSON.stringify(error));
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
    isShowPassword,
    setIsShowPassword,
    handlePasswordChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleEmailChange
  };
};
