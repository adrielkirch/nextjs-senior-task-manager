// ** React Imports
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
// import DatePicker from 'react-datepicker'

// ** Styled Components
//import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { Card, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { useDataViewModel } from 'src/view_model/tabTeamsViewModel'
import DefaultAlert from 'src/layouts/components/alert/Alert'
import TableBasic, { Column } from '../tables/TableBasic'
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'

const columns: Column[] = [
  { field: 'name', headerName: 'Name', align: 'left' },
  { field: 'surname', headerName: 'Surname', align: 'left' },
  { field: 'email', headerName: 'Email', align: 'left' },
  { field: 'role', headerName: 'Role', align: 'left' },
  { field: 'phone', headerName: 'Phone', align: 'left' },
  { field: 'createdAt', headerName: 'Created At', align: 'left' },
  {
    field: 'actions',
    headerName: 'Actions',
    align: 'left',
    renderCell: row => (
      <>
        <Button onClick={() => alert(`Deleting ${row.name}`)}>Delete</Button>
      </>
    )
  }
]

const rows = [
  {
    name: 'Adriel',
    surname: 'Kirch',
    email: 'adriel.kirch.1@gmail.com',
    role: 'admin',
    phone: '+18012387239',
    createdAt: '2024-05-23T11:01:53.419+00:00'
  }
]

const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius
}))

const TabTeams = () => {
  const viewModel = useDataViewModel()
  console.log(viewModel)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12}></Grid>

          {viewModel.hasTeam ? (
            <>
              <Grid item xs={12}>
                <Form onSubmit={e => e.preventDefault()}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                        viewModel.setInviteTeamMemberFormData({
                          ...viewModel.inviteTeamMemberFormData,
                          email: event.target.value
                        })
                      }} fullWidth label='E-mail' placeholder='e-mail' />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Select
                          label='Role'
                          defaultValue=''
                          id='form-layouts-separator-select'
                          labelId='form-layouts-separator-select-label'
                          onChange={(event: SelectChangeEvent<string>) => {
                            viewModel.setInviteTeamMemberFormData({
                              ...viewModel.inviteTeamMemberFormData,
                              role: event.target.value as string
                            });
                          }}
                        >
                          <MenuItem value='admin'>admin</MenuItem>
                          <MenuItem value='writer'>writer</MenuItem>
                          <MenuItem value='guest'>guest</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        size='large'
                        type='submit'
                        variant='contained'
                        sx={{ width: '100%' }}
                        onClick={(event: React.FormEvent) => {
                          viewModel.handleInviteTeam(event)
                        }}
                      >
                        Add team member &nbsp;
                        <Icon className='ml-3' path={mdiPlus} size={1} />
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <TableBasic columns={columns} rows={rows} />
                </Card>
              </Grid>

              <Grid item xs={12}>
                <DefaultAlert
                  severity={viewModel.alert.severity}
                  onClose={() => viewModel.changeAlertVisibility(false)}
                  text={viewModel.alert.text}
                  visible={viewModel.alert.visible}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    viewModel.setAddTeamFormData({
                      ...viewModel.addTeamFormData,
                      name: event.target.value
                    })
                  }}
                  fullWidth
                  label='Team name'
                  placeholder='Type a team name'
                />
              </FormControl>
              <Grid item xs={12} mt={2}>
                <Button
                  size='large'
                  type='submit'
                  onClick={(event: React.FormEvent) => {
                    viewModel.handleAddTeam(event)
                  }}
                  variant='contained'
                >
                  Create team &nbsp;
                  <Icon className='ml-3' path={mdiPlus} size={1} />
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabTeams
