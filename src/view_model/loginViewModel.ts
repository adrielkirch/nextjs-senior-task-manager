import { MouseEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import login from 'src/requests/user/login.user.request';
import me from 'src/requests/user/me.user.request';
import { AlertProps } from 'src/layouts/components/alert/Alert';
import { LoginRequestDto } from 'src/adapters/request/user.request.dto';

export interface LoginViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  handleLogin: () => void;

  isShowPassword: boolean;
  setIsShowPassword: (value: boolean) => void;
  handlePasswordChange: (value: string) => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  handleEmailChange: (value: string) => void;
  alert: AlertProps;
  changeAlertVisibility: (visible: boolean) => void;
  loginData: LoginRequestDto;
}

export const useDataViewModel = (): LoginViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginRequestDto>({
    password: '',
    email: '',
  })
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
    setLoginData({
      ...loginData,
      password: value
    })
  }
  const handleEmailChange = (value: string) => {
    setLoginData({
      ...loginData,
      email: value
    })
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
      const data = await login(loginData);
      if (data) localStorage.setItem('token', data.token)

      if (data) localStorage.setItem('id', data.id)
      if (data) localStorage.setItem('role', data.role)

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
        visible: true,
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
    isShowPassword,
    setIsShowPassword,
    handlePasswordChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleEmailChange,
    alert,
    changeAlertVisibility,
    loginData
  };
};
