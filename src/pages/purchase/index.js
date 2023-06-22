// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Snackbar } from '@mui/material'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { MdModeEditOutline } from 'react-icons/md'


import AddOrEditPurchase from 'src/views/AddorEditPurchase'

const Purchase = () => {

  const [data, setData] = useState([]);

  //1 for puchase 0 for sell
  const [type, setType] = useState(1);

  const [toaster, setToaster] = useState(false);
  const [addPurchase, setAddPurchase] = useState(null);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddPurchase(null)
  };

  const handleOpenToaster = () => {
    setToaster(true);
  }

  const handleCloseToaster = () => {
    setToaster(false);
  }

  const fetch = () => {
    try {
      axios.get("http://localhost:3100/transaction/get", { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0N2I3OWU1ZGUyMDJiMmYxMTMyY2Y4ZSIsImZpcnN0TmFtZSI6IkRlZXBhayIsImxhc3ROYW1lIjoiTWFuZSIsInVzZXJOYW1lIjoibWFuZWRlZXAyMDAxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiRGVlcGFrIiwiX192IjowfSwiaWF0IjoxNjg1ODE0MDYxLCJleHAiOjE3MTczNTAwNjF9.MBjwAcICyBmAL6O0oxMcD8P_stCpfgWdMEs_vliM8T0' } })
        .then(res => {
          console.log(res.data.data)
          setData(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    } catch (rrr) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <Grid container spacing={6}>
      <Snackbar open={toaster} autoHideDuration={6000} onClose={handleCloseToaster} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} style={{ top: "10%" }}>
        <Alert onClose={handleCloseToaster} severity="success" sx={{ width: '100%' }}>
          Purchase added successfully
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => setType(!type)}>
          See {type ? "Sell" : "Purchase"} Data
        </Button>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <Button variant="outlined" onClick={handleClickOpen}>
            Add {type ? "Purchase" : "Sell"}
          </Button>
          {/* <TableStickyHeader setEditStock={setEditStock}  editStock={editStock} data={data} /> */}

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Invoice No
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Party
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Date
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Products
                    </TableCell>

                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return ( */}

                  {data.filter(d => (d.type === (type ? 'purchase' : 'sell'))).map(d => (
                    <TableRow hover role='checkbox' tabIndex={-1} key={d.id}>
                      <TableCell key={data.id} align="left">
                        {d.id}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.clientName}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.invoiceDate}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.products.map(p => (
                          p.name + "-" + p.size
                        ))}
                      </TableCell>

                      <TableCell key={data.id} align="left">
                        <MdModeEditOutline color="#9155FD" size="20px" style={{ cursor: "pointer" }} onClick={() => setAddPurchase(d)} />

                      </TableCell>
                    </TableRow>
                  ))}

                  {/* })} */}

                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Card>
      </Grid>

      <AddOrEditPurchase open={open} type={type} handleClickOpen={handleClickOpen} setEditPurchase={setAddPurchase} editPurchase={addPurchase} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />

    </Grid>
  )
}

export default Purchase
