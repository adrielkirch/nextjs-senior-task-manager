// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

export interface Column {
  field: string
  headerName: string
  align?: 'left' | 'right' | 'center'
  renderCell?: (row: Record<string, any>) => React.ReactNode
}

interface TableBasicProps {
  columns: Column[]
  rows: Record<string, any>[]
}

const TableBasic: React.FC<TableBasicProps> = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='dynamic table'>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.field} align={column.align || 'left'}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{
                '&:last-of-type td, &:last-of-type th': { border: 0 }
              }}
            >
              {columns.map(column => (
                <TableCell key={column.field} align={column.align || 'left'}>
                  {column.renderCell ? column.renderCell(row) : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
