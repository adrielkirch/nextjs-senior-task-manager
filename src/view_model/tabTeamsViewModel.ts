import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { AlertProps } from 'src/layouts/components/alert/Alert';
import findMyTeam from 'src/requests/team/me.profile.request';
import create from 'src/requests/team/create.team.request';
import { CreateRequestTeamDto, InviteRequestTeamDto } from 'src/adapters/request/team.request.dto';
import { TeamResponseDto } from 'src/adapters/response/team.response.dto';
import invite from 'src/requests/team/invite.team.request';

export interface TeamsTabViewModelProps {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  onChange: (file: ChangeEvent) => void;
  setImgSrc: (val: string) => void;
  imgSrc: string;
  alert: AlertProps,
  setAlert: (val: AlertProps) => void,
  changeAlertVisibility: (visible: boolean) => void;
  handleAddTeam: (event: React.FormEvent) => void;
  hasTeam: boolean;
  addTeamFormData: CreateRequestTeamDto
  setAddTeamFormData: (value: CreateRequestTeamDto) => void
  handleInviteTeam: (event: React.FormEvent) => void
  setInviteTeamMemberFormData: (value: InviteRequestTeamDto) => void
  inviteTeamMemberFormData: InviteRequestTeamDto
}

export const useDataViewModel = (): TeamsTabViewModelProps => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [hasTeam, setHasTeam] = useState<boolean>(false);
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/avatar.png');
  const [addTeamFormData, setAddTeamFormData] = useState<CreateRequestTeamDto>({
    userId: localStorage.getItem('id') + '',
    name: '',
  });

  const [inviteTeamMemberFormData, setInviteTeamMemberFormData] = useState<InviteRequestTeamDto>({
    userId: localStorage.getItem('id') + '',
    teamId: localStorage.getItem('teamId') + '',
    email: '',
    role: '',
  });

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

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    fetchAdminTeam();
  }, []);


  const fetchAdminTeam = async () => {
    try {
      changeAlertVisibility(false);
      const teamList: TeamResponseDto[] = await findMyTeam();
      localStorage.setItem('teamId', teamList[0].id);
      setHasTeam(true)
    } catch (error: any) {
      setAlert({
        ...alert,
        text: error.message,
        severity: 'error',
        visible: true
      })
      setHasTeam(false)
    }
  };

  const handleAddTeam = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await create(addTeamFormData)
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


  const handleInviteTeam = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await invite(inviteTeamMemberFormData)
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
    addTeamFormData,
    checkAuthentication,
    setAddTeamFormData,
    inviteTeamMemberFormData,
    onChange,
    setInviteTeamMemberFormData,
    setImgSrc,
    imgSrc,
    alert,
    setAlert,
    changeAlertVisibility,
    handleAddTeam,
    handleInviteTeam,
    hasTeam
  };
};
