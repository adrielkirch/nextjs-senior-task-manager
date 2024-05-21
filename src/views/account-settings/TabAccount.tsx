// ** React Imports
import { ElementType } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { useDataViewModel } from 'src/view_model/tabAccountViewModel'
import DefaultAlert from 'src/layouts/components/alert/Alert'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const viewModel = useDataViewModel()
  console.log(viewModel)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={viewModel.imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={viewModel.onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color='error'
                  variant='outlined'
                  onClick={() => viewModel.setImgSrc('/images/avatars/avatar.png')}
                >
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              disabled={true}
              value={viewModel.userData.email}
              defaultValue={viewModel.userData.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              onChange={(event: any) => {
                viewModel.updateUserState('name', event.target.value)
              }}
              defaultValue={viewModel.userData.name}
              value={viewModel.userData.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(event: any) => {
                viewModel.updateUserState('surname', event.target.value)
              }}
              fullWidth
              label='Surname'
              defaultValue={viewModel.userData.surname}
              value={viewModel.userData.surname}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                onChange={(event: any) => {
                  viewModel.updateUserState('role', event.target.value)
                }}
                label='Role'
                value={viewModel.userData.role}
              >
                <MenuItem value='admin'>admin</MenuItem>
                <MenuItem value='writer'>writer</MenuItem>
                <MenuItem value='guest'>guest</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Phone'
              value={viewModel.userData.phone}
              defaultValue={viewModel.userData.phone}
              onChange={(event: any) => {
                viewModel.updateUserState('phone', event.target.value)
              }}
            />
          </Grid>

          <DefaultAlert
            severity={viewModel.alert.severity}
            onClose={() => viewModel.changeAlertVisibility(false)}
            text={viewModel.alert.text}
            visible={viewModel.alert.visible}
          />

          <Grid item xs={12}>
            <Button onClick={viewModel.handleUpdate} variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>

          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
