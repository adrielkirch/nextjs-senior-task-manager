// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import { useDataViewModel } from 'src/view_model/tabSecurityViewModel'
import { ChangeEvent } from 'react'
import DefaultAlert from 'src/layouts/components/alert/Alert'

const TabSecurity = () => {
  const viewModel = useDataViewModel()
  console.log(viewModel)

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={viewModel.values.currentPassword}
                    id='account-settings-current-password'
                    type={viewModel.values.showCurrentPassword ? 'text' : 'password'}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      viewModel.handleChangePasswordProperty(event, 'currentPassword')
                    }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={viewModel.handleClickShowCurrentPassword}
                          onMouseDown={viewModel.handleMouseDownCurrentPassword}
                        >
                          {viewModel.values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={viewModel.values.newPassword}
                    id='account-settings-new-password'
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      viewModel.handleChangePasswordProperty(event, 'newPassword')
                    }}
                    type={viewModel.values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={viewModel.handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={viewModel.handleMouseDownNewPassword}
                        >
                          {viewModel.values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={viewModel.values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={viewModel.values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      viewModel.handleChangePasswordProperty(event, 'confirmNewPassword')
                    }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={viewModel.handleClickShowConfirmNewPassword}
                          onMouseDown={viewModel.handleMouseDownConfirmNewPassword}
                        >
                          {viewModel.values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={6} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img alt='avatar' height={320} width={320} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: 'flex', alignItems: 'center' }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant='h6'>Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Avatar
              variant='rounded'
              sx={{ width: 48, height: 48, color: 'common.white', backgroundColor: 'primary.main' }}
            >
              <LockOpenOutline sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in. Learn more.
            </Typography>
          </Box>
        </Box>

        <DefaultAlert
          severity={viewModel.alert.severity}
          onClose={() => viewModel.changeAlertVisibility(false)}
          text={viewModel.alert.text}
          visible={viewModel.alert.visible}
        />

        <Box sx={{ mt: 11 }}>
          <Button onClick={viewModel.handleUpdate} variant='contained' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
