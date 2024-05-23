// ** React Imports
import { ChangeEvent, ElementType } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button, { ButtonProps } from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
// import DatePicker from 'react-datepicker'

// ** Styled Components
//import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { Checkbox, FormGroup, Typography } from '@mui/material'
import { useDataViewModel } from 'src/view_model/tabInfoViewModel'
import DefaultAlert from 'src/layouts/components/alert/Alert'

// const CustomInput = forwardRef((props, ref) => {
//   return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
// })

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

const TabInfo = () => {
  const viewModel = useDataViewModel()
  console.log(viewModel)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={'/images/avatars/avatar.png'} alt='Profile Pic' />
              <div>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input hidden type='file' accept='image/png, image/jpeg' id='account-settings-upload-image' />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined'>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Biography'
              minRows={2}
              placeholder='Biography'
              value={viewModel.profileData.biography}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                viewModel.updateProfileState('biography', event.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={(date: Date) => setDate(date)}
              />
            </DatePickerWrapper> */}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component='fieldset'>
              <FormLabel component='legend' sx={{ fontSize: '0.875rem' }}>
                Gender
              </FormLabel>
              <RadioGroup
                row
                value={viewModel.profileData.gender}
                onChange={viewModel.handleRadioChange}
                aria-label='gender'
                name='account-settings-info-radio'
              >
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component='fieldset'>
              <FormLabel component='legend' sx={{ fontSize: '0.875rem' }}>
                Notification
              </FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={viewModel.selectedOptions.includes('email')}
                      onChange={viewModel.handleCheckboxChange}
                      value='email'
                    />
                  }
                  label='Email'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={viewModel.selectedOptions.includes('sms')}
                      onChange={viewModel.handleCheckboxChange}
                      value='sms'
                    />
                  }
                  label='SMS'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={viewModel.selectedOptions.includes('notifications')}
                      onChange={viewModel.handleCheckboxChange}
                      value='notifications'
                    />
                  }
                  label='Push Notification'
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DefaultAlert
              severity={viewModel.alert.severity}
              onClose={() => viewModel.changeAlertVisibility(false)}
              text={viewModel.alert.text}
              visible={viewModel.alert.visible}
            />
          </Grid>
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

export default TabInfo
