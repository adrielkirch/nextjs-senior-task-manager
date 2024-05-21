import { MouseEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import register from 'src/requests/user/register.user.request';
import { AlertProps } from 'src/layouts/components/alert/Alert';

export interface RegisterViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  handleRegister: () => void;
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
  handleNameChange: (value: string) => void;
  handleSurnameChange: (value: string) => void;
  handlePhoneChange: (value: string) => void;
  setRole: (value: string) => void;
  alert: AlertProps;
  changeAlertVisibility: (visible: boolean)=> void;
}

export const useDataViewModel = (): RegisterViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<string>('admin');
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

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }
  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handleSurnameChange = (value: string) => {
    setSurname(value)
  }
  const handleNameChange = (value: string) => {
    setName(value)
  }
  const handlePhoneChange = (value: string) => {
    setPhone(value)
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

      const data = await register({
        name,
        surname,
        email,
        password,
        phone,
        role
      });
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
    handleNameChange,
    handleSurnameChange,
    handlePhoneChange,
    setRole,
    alert,
    changeAlertVisibility
  };
};
