// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Button } from '@mui/material'
import { MdModeEditOutline } from 'react-icons/md'



const TableStickyHeader = ({ data, setEditStock, columns, editStock }) => {
  // ** States


  var arr = [];
  useEffect(() => {
    data.forEach(d => {
      d.type.filter(dd => {
        d[dd.size] = dd.quantity;
        if (!arr.includes(dd.size)) {
          arr.push(dd.size);
        }
      });
    })

    data.forEach(d => {
      arr.forEach(a => {
        if (!Object.keys(d).includes(a)) {
          d[a] = "-";
        }
      })
    })
  }, [data])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ minWidth: 100 }}>
                Name
              </TableCell>
              {columns.map(a => (
                <TableCell key={a.id} align="left" sx={{ minWidth: 40 }}>
                  {a}
                </TableCell>
              ))}
              <TableCell align="left" sx={{ minWidth: 100 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return ( */}

            {data.map(d => (
              <TableRow hover role='checkbox' tabIndex={-1} key={d.id}>
                <TableCell key={data.id} align="left">
                  {d.name}
                </TableCell>
                {columns.map((u, index) => (
                  <TableCell key={d.id} align="left">
                    {d[u]}
                  </TableCell>
                ))}
                <TableCell key={data.id} align="left">
                  <MdModeEditOutline color="#9155FD" size="20px" style={{ cursor: "pointer" }} onClick={() => setEditStock(d)} />

                </TableCell>
              </TableRow>
            ))}

            {/* })} */}

          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>

  )
}

export default TableStickyHeader
