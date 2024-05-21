import { MouseEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import login from 'src/requests/user/login.user.request';
import me from 'src/requests/user/me.user.request';
import { AlertProps } from 'src/layouts/components/alert/Alert';

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
  alert: AlertProps;
  changeAlertVisibility: (visible: boolean)=> void;
}

export const useDataViewModel = (): LoginViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>({
    severity: 'error',
    onClose: () => changeAlertVisibility(false),
    text: '',
    visible: false,
  })

  const router = useRouter();

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const changeAlertVisibility = (visible: boolean) => {
    setAlert({
      ...alert,
      visible: visible,
    })
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
      changeAlertVisibility(false)
      const data = await login({
        email,
        password
      });
      if (data) localStorage.setItem('token', data.token)
      else return

      router.push('/');

      // Wait for 1 second before making another request
      await new Promise(resolve => setTimeout(resolve, 1000));

      fetchAccount();
    } catch (error: any) {
      console.error('Login failed:', JSON.stringify(error));
      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible:true,
      })
    }
  };

  const fetchAccount = async () => {
    try {
      const data = await me();
      localStorage.setItem('session', JSON.stringify(data));
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
    handleEmailChange,
    alert,
    changeAlertVisibility
  };
};
