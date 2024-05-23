// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import { useDataViewModel } from 'src/view_model/tabAccountViewModel'
import DefaultAlert from 'src/layouts/components/alert/Alert'
import { Button } from '@mui/material'

const TabAccount = () => {
  // ** State
  const viewModel = useDataViewModel()
  console.log(viewModel)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7} sx={{ marginTop: 4.8, marginBottom: 3 }}>
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

export default TabAccount
