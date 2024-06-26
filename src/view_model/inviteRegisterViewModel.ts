import { MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import register from 'src/requests/user/register.user.request';
import { AlertProps } from 'src/layouts/components/alert/Alert';
import { CreateRequestUserDto } from 'src/adapters/request/user.request.dto';
import create from 'src/requests/profile/create.profile.request';
import join from 'src/requests/teamUser/join.teamUser.request';
import login from 'src/requests/user/login.user.request';


export interface InviteRegisterViewModelProps {
  isAuthenticated: boolean;
  isShowPassword: boolean;
  handleClickShowPassword: () => void;
  setIsShowPassword: (value: boolean) => void;
  checkAuthentication: () => void;
  handleRegister: () => void;
  handleMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  alert: AlertProps;
  changeAlertVisibility: (visible: boolean) => void;
  registerData: CreateRequestUserDto;
  setRegisterData: (value: CreateRequestUserDto) => void;
  handleProcessRegisterLoginAndJoinTeam: () => void;
  token: string | null;
}

export const useDataViewModel = (): InviteRegisterViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<CreateRequestUserDto>({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 'admin',
    phone: '',
  });

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>({
    severity: 'error',
    onClose: () => changeAlertVisibility(false),
    text: '',
    visible: false,
  });

  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  const changeAlertVisibility = (visible: boolean) => {
    setAlert({
      ...alert,
      visible: visible,
    });
  };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(false);
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleRegister = async () => {
    try {
      changeAlertVisibility(false);

      const data = await register(registerData);
      if (!data) return;
      localStorage.setItem('id', data.id);

      return data
    } catch (error: any) {
      throw error;
    }
  };

  const handleCreateProfile = async () => {
    try {
      await create({
        userId: String(localStorage.getItem('id')),
        notifications: ['email'],
        image: '',
        gender: '',
        biography: '',
      });
    } catch (error: any) {
      throw error;
    }
  };
  const handleLogin = async () => {
    try {
      changeAlertVisibility(false)
      const data = await login({
        email: registerData.email,
        password: registerData.password,
      });
      if (data) localStorage.setItem('token', data.token)
      if (data) localStorage.setItem('id', data.id)
      if (data) localStorage.setItem('role', data.role)
    } catch (error: any) {
      throw error;
    }
  };

  const handleJoinTeam = async (token: string) => {
    try {
      if (token !== null) {
        await join({
          userId: localStorage.getItem('id') + '',
          token: token,
        });
      } else {
        throw new Error('Token is null or undefined.');
      }
    } catch (error: any) {
      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true,
      });
    }
  };



  const handleProcessRegisterLoginAndJoinTeam = async () => {
    try {
      await handleRegister();
      await handleCreateProfile();
      await handleLogin();
      await handleJoinTeam(String(token));
      router.push("/")
    } catch (error: any) {
      console.error('Error in handleProcessRegisterLoginAndJoinTeam:', error.message);
      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true,
      });
    }
  };

  useEffect(() => {
    checkAuthentication();

    const { token } = router.query;

    if (typeof token === 'string') {
      setToken(token);
      console.log(token);
    }

  }, [router.query]);

  return {
    isAuthenticated,
    checkAuthentication,
    handleProcessRegisterLoginAndJoinTeam,
    handleRegister,
    isShowPassword,
    setIsShowPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    alert,
    changeAlertVisibility,
    registerData,
    setRegisterData,
    token,
  };
};
