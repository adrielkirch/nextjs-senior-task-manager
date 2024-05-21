import { MouseEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import register from 'src/requests/user/register.user.request';
import { AlertProps } from 'src/layouts/components/alert/Alert';
import { CreateRequestUserDto } from 'src/adapters/request/user.request.dto';

export interface RegisterViewModelProps {
  isAuthenticated: boolean;
  isShowPassword: boolean;
  handleClickShowPassword:() => void;
  setIsShowPassword: (value: boolean) => void;
  checkAuthentication: () => void;
  handleRegister: () => void;
  handleMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  alert: AlertProps;
  changeAlertVisibility: (visible: boolean)=> void;
  registerData:CreateRequestUserDto;
  setRegisterData: (value: CreateRequestUserDto) => void;
}

export const useDataViewModel = (): RegisterViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<CreateRequestUserDto>({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 'admin',
    phone: '',
  })

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>({
    severity: 'error',
    onClose: () => changeAlertVisibility(false),
    text: '',
    visible: false,
  })


  const router = useRouter();

  const changeAlertVisibility = (visible: boolean) => {
    setAlert({
      ...alert,
      visible: visible,
    })
  }
  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
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

  const handleRegister = async () => {
    try {
      changeAlertVisibility(false)

      const data = await register(registerData);
      if (!data) return


      router.push('/login');
    } catch (error: any) {
      console.error('Register failed top:', JSON.stringify(error));
      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true,
      })
    }

  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return {
    isAuthenticated,
    checkAuthentication,
    handleRegister,
    isShowPassword,
    setIsShowPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    alert,
    changeAlertVisibility,
    setRegisterData,
    registerData,

  };
};
