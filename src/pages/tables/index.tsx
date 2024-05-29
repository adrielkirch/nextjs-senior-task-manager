// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** View Model
import { useDataViewModel } from 'src/view_model/tablesViewModel'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const MUITable = () => {
  const viewModel = useDataViewModel()
  console.log(viewModel)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            MUI Tables
          </Link>
        </Typography>
        <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>

          <TableBasic
            columns={[
              { field: 'name', headerName: 'Dessert (100g serving)', align: 'left' },
              { field: 'calories', headerName: 'Calories', align: 'right' },
              { field: 'fat', headerName: 'Fat (g)', align: 'right' },
              { field: 'carbs', headerName: 'Carbs (g)', align: 'right' },
              { field: 'protein', headerName: 'Protein (g)', align: 'right' },
              {
                field: 'actions',
                headerName: 'Actions',
                align: 'left',
                renderCell: (row) => (
                  <button onClick={() => alert(`Action on ${row.name}`)}>Action</button>
                ),
              },
            ]}
            rows={[
              { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
              { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
              { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
              { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
              { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 }
            ]}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableDense />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCollapsible />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Spanning Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableSpanning />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCustomized />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
