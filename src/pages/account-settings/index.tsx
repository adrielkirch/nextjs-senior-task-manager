// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import Icon from '@mdi/react'
import { mdiAccountMultipleOutline } from '@mdi/js'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useDataViewModel } from 'src/view_model/accountSettingsViewModel'
import TabTeams from 'src/views/account-settings/TabTeams'
import { ProfileResponseDto } from 'src/adapters/response/profile.response.dto'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('account')
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'))
  const viewModel = useDataViewModel()
  console.log(viewModel)

  useEffect(()=> {
    setRole(localStorage.getItem('role'));
  },[])

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const initialProfileData: ProfileResponseDto = {
    id: '',
    notifications: [],
    gender: '',
    image: '',
    userId: '',
    biography:'',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />

          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Profile</TabName>
              </Box>
            }
          />
          {role === 'super admin' && (
            <Tab
              value='team'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon path={mdiAccountMultipleOutline} size={1} />
                  <TabName>Team</TabName>
                </Box>
              }
            />
          )}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo initialProfileData={initialProfileData} />
        </TabPanel>

        {role === 'super admin' && (
          <TabPanel sx={{ p: 0 }} value='team'>
            <TabTeams />
          </TabPanel>
        )}
      </TabContext>
    </Card>
  )
}

export default AccountSettings
