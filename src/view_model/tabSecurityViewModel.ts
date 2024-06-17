import { useState, useEffect, ChangeEvent, MouseEvent, } from 'react';
import { useRouter } from 'next/router';
import { AlertProps } from 'src/layouts/components/alert/Alert';
import updatePassword from 'src/requests/user/update.password.user.request';

export interface ChangePasswordState {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean

}

export interface SecurityTabViewModelProps {
  values: ChangePasswordState;
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  handleUpdate: () => void;
  alert: AlertProps,
  setAlert: (val: AlertProps) => void,
  changeAlertVisibility: (visible: boolean) => void;
  handleMouseDownCurrentPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  handleMouseDownConfirmNewPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  handleChangePasswordProperty: (event: ChangeEvent<HTMLInputElement>, property: string) => void;
  handleClickShowCurrentPassword: () => void;
  handleClickShowConfirmNewPassword: () => void;
  handleMouseDownNewPassword: (event: MouseEvent<HTMLButtonElement>) => void;
  handleClickShowNewPassword: () => void;
}

export const useDataViewModel = (): SecurityTabViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const router = useRouter();

  // ** States
  const [values, setValues] = useState<ChangePasswordState>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // Handle Current Password
  const handleChangePasswordProperty = (event: ChangeEvent<HTMLInputElement>, property: string) => {
    setValues({ ...values, [property]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [alert, setAlert] = useState<AlertProps>({
    severity: 'error',
    onClose: () => changeAlertVisibility(false),
    text: '',
    visible: false,
  })


  const changeAlertVisibility = (visible: boolean) => {
    setAlert({
      ...alert,
      visible: visible,
    })
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

  useEffect(() => {
    checkAuthentication();
  }, []);


  const handleUpdate = async () => {
    try {
      changeAlertVisibility(false);
      const data = await updatePassword({
        currentPassword: values.currentPassword,
        password: values.newPassword,
      });
      if (!data) return;
      setAlert({
        ...alert,
        text: 'Password updated successfully',
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
    handleUpdate,
    alert,
    setAlert,
    changeAlertVisibility,
    handleChangePasswordProperty,
    handleClickShowCurrentPassword,
    handleMouseDownCurrentPassword,

    handleMouseDownConfirmNewPassword,
    handleClickShowConfirmNewPassword,

    handleMouseDownNewPassword,
    handleClickShowNewPassword,
    values,

  };
};
