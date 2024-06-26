// useDataViewModel.tsx

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { AlertProps } from 'src/layouts/components/alert/Alert';
import update from 'src/requests/profile/update.profile.request';
import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto';
import me from 'src/requests/profile/me.profile.request';

export interface InfoTabViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  onChange: (file: ChangeEvent<HTMLInputElement>) => void;
  setImgSrc: (val: string) => void;
  imgSrc: string;
  fetchProfile: () => Promise<void>; // Adjusted to return a Promise
  profileData: ProfileResponseDto;
  handleUpdate: () => Promise<void>; // Adjusted to return a Promise
  updateProfileState: <T>(key: string, value: T) => void;
  alert: AlertProps;
  setAlert: (val: AlertProps) => void;
  changeAlertVisibility: (visible: boolean) => void;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useDataViewModel = ({ initialProfileData }: { initialProfileData: ProfileResponseDto }): InfoTabViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/avatar.png');
  const [alert, setAlert] = useState<AlertProps>({
    severity: 'error',
    onClose: () => changeAlertVisibility(false),
    text: '',
    visible: false,
  });
  const [profileData, setProfileData] = useState<ProfileResponseDto>(initialProfileData);

  const changeAlertVisibility = (visible: boolean) => {
    setAlert({
      ...alert,
      visible: visible,
    });
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateProfileState('gender', event.target.value);
  };

  const onChange = (file: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      router.push('/pages/login/');
    } else {
      setIsAuthenticated(true);
    }
  };

  const updateProfileState = <T>(key: string, value: T) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [key]: value,
    }));
  };

  const fetchProfile = async () => {
    try {
      changeAlertVisibility(false);
      const data = await me();
      setProfileData(data as ProfileResponseDto);
      console.log(data);
      localStorage.setItem('profile', JSON.stringify(data));
    } catch (error: any) {
      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      changeAlertVisibility(false);
      const data = await update(profileData);
      if (data) setProfileData(data);
      localStorage.setItem('session', JSON.stringify(data));
      setAlert({
        ...alert,
        text: 'Account updated successfully',
        severity: 'success',
        visible: true,
      });
    } catch (error: any) {
      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true,
      });
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let notifications: string[] = []
    if (profileData) notifications = [...profileData.notifications];
    const valueIndex = notifications.indexOf(value);

    if (valueIndex !== -1) {
      notifications.splice(valueIndex, 1); // Remove if already exists
    } else {
      notifications.push(value);
    }

    if (!profileData) return

    setProfileData((prev) => ({
      ...prev,
      notifications: notifications,
    }));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, []);

  return {
    isAuthenticated,
    checkAuthentication,
    onChange,
    setImgSrc,
    imgSrc,
    fetchProfile,
    handleUpdate,
    updateProfileState,
    profileData,
    alert,
    setAlert,
    changeAlertVisibility,
    handleCheckboxChange,
    handleRadioChange,
  };
};
