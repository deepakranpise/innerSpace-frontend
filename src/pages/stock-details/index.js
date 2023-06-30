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
import withAuth from 'src/hoc/withAuth'
import axiosInstance from 'src/hoc/axios'
import moment from 'moment'
import { useRouter } from 'next/router'

const Purchase = () => {

  const [data, setData] = useState([]);
  const router = useRouter();

  //1 for puchase 0 for sell
  const [type, setType] = useState(1);

  const [toaster, setToaster] = useState(false);
  const [errorToaster, setErrorToaster] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);


  const [addPurchase, setAddPurchase] = useState(false);

  const handleClickOpen = (type) => {
    setType(type);
    setAddPurchase(true);
  };

  const handleClose = () => {
    setAddPurchase(false);
    setEditPurchase(null)
  };

  const handleOpenToaster = () => {
    setToaster(true);
  }

  const handleCloseToaster = () => {
    setToaster(false);
    setErrorToaster(false);
  }

  const fetch = () => {
    try {
      axiosInstance.get("transaction/get")
        .then(res => {
          console.log(res.data.data)
          setData(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
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
      <Snackbar open={errorToaster} autoHideDuration={6000} onClose={handleCloseToaster} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} style={{ top: "10%" }}>
        <Alert onClose={handleCloseToaster} severity="error" sx={{ width: '100%' }}>
          Error While Adding Product
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        {/* <Button variant="outlined" onClick={() => setType(!type)}>
          See {type ? "Sell" : "Purchase"} Data
        </Button> */}
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          {/* <Button variant="outlined" onClick={() => handleClickOpen(1)}>
            Add Purchase
          </Button>

          <Button variant="outlined" onClick={() => handleClickOpen(0)}>
            Add Sell
          </Button> */}

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 550 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Date
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Invoice No
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Party
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Category
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Sub-Category
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Product Name
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Product Code
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Sell Qty
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Purchase Qty
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return ( */}

                  {/* {data.filter(d => (d.type === (type ? 'purchase' : 'sell'))).map(d => ( */}
                  {data.map(d => (

                    d.products.map(p => (


                      <TableRow hover role='checkbox' tabIndex={-1} key={d.id} style={{ cursor: "pointer" }} onClick={() => router.push(`/purchase/${d._id}`)}>

                        <TableCell key={data.id} align="left">
                          {moment(d.invoiceDate).format("YYYY-MM-DD")}
                        </TableCell>

                        <TableCell key={data.id} align="left">
                          {d.id}
                        </TableCell>
                        <TableCell key={data.id} align="left">
                          {d.clientName.name}
                        </TableCell>
                        <TableCell key={data.id} align="left">
                          {p.productId.categoryId}
                        </TableCell>
                        <TableCell key={data.id} align="left">
                          {p.productId.subCategoryId}
                        </TableCell>
                        <TableCell key={data.id} align="left">
                          {p.productId.name}
                        </TableCell>
                        <TableCell key={data.id} align="left">
                          {p.productId.code}
                        </TableCell>
                        <TableCell key={data.id} align="left">
                          {d.type === "sell" ? p.quantity: '-'}
                        </TableCell>

                        <TableCell key={data.id} align="left">
                          {d.type === "purchase" ? p.quantity : '-'}
                        </TableCell>
                      </TableRow>
                    ))

                  ))}

                  {/* })} */}

                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Card>
      </Grid>

      <AddOrEditPurchase addPurchase={addPurchase} setErrorToaster={setErrorToaster} type={type} editPurchase={editPurchase} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />

    </Grid>
  )
}

export default withAuth(Purchase)