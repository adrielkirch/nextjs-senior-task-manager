import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import me from 'src/requests/user/me.user.request';
import { UserResponseDto } from 'src/adapters/response/user.response.dto';
import update from 'src/requests/user/update.user.request';
import { AlertProps } from 'src/layouts/components/alert/Alert';

export interface AccountTabViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  onChange: (file: ChangeEvent) => void;
  setImgSrc: (val: string) => void;
  imgSrc: string;
  fetchAccount: () => void;
  userData: UserResponseDto;
  handleUpdate: () => void;
  updateUserState: <T>(key: string, value: T) => void;
  alert: AlertProps,
  setAlert: (val: AlertProps) => void,
  changeAlertVisibility: (visible: boolean)=> void;
}

export const useDataViewModel = (): AccountTabViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/avatar.png')

  const [alert, setAlert] = useState<AlertProps>({
    severity: 'error',
    onClose: () => changeAlertVisibility(false),
    text: '',
    visible: false,
  })

  const [userData, setUserData] = useState<UserResponseDto>({
    id: '',
    name: '',
    surname: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: '',
    phone: ''
  })

  const changeAlertVisibility = (visible: boolean) => {
    setAlert({
      ...alert,
      visible: visible,
    })
  }

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      router.push('/pages/login/');
    } else {
      setIsAuthenticated(true);
    }
  };

  const updateUserState = <T>(key: string, value: T) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [key]: value
    }));
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const fetchAccount = async () => {
    try {
      changeAlertVisibility(false);
      const data = await me();
      if (data) setUserData(data);
      localStorage.setItem('session', JSON.stringify(data));
    } catch (error: any) {

      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true
      })
    }
  };

  const handleUpdate = async () => {
    try {
      changeAlertVisibility(false);
      const data = await update(userData);
      if (data) setUserData(data);
      localStorage.setItem('session', JSON.stringify(data));

      setAlert({
        ...alert,
        text: 'Account updated successfully',
        severity: 'success',
        visible: true
      })
    } catch (error: any) {
      console.log(error.message);

      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true
      })
    }
  }

  return {
    isAuthenticated,
    checkAuthentication,
    onChange,
    setImgSrc,
    imgSrc,
    fetchAccount,
    handleUpdate,
    updateUserState,
    userData,
    alert,
    setAlert,
    changeAlertVisibility
  };
};
