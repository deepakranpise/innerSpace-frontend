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
import FallbackSpinner from 'src/@core/components/spinner'

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
    // alert()
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

          const arrayUniqueById = [...new Map(res.data.data.map(item =>
            [item['invoiceNo'], item])).values()];

          setData(arrayUniqueById);
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

  if (!data) return <FallbackSpinner />

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
          <Button variant="outlined" onClick={() => handleClickOpen(1)}>
            {/* Add {type ? "Purchase" : "Sell"} */}
            Add Purchase
          </Button>

          <Button variant="outlined" onClick={() => handleClickOpen(0)}>
            {/* Add {type ? "Purchase" : "Sell"} */}
            Add Sell
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
                    {/* <TableCell align="left" sx={{ minWidth: 100 }}>
                      Products
                    </TableCell> */}
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Type
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length === 0 && (
                    <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', margin: "20px" }}>
                      <Typography>No Data Found</Typography>
                    </Grid>)}

                  {data.map(d => (

                    <TableRow hover role='checkbox' tabIndex={-1} key={d.id} style={{ cursor: "pointer" }} onClick={() => router.push(`/purchase/${d.id}`)}>
                      <TableCell key={data.id} align="left">
                        {d.invoiceNo}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.clientName}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {moment(d.invoiceDate).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d?.type}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        <MdModeEditOutline color="#9155FD" size="20px" style={{ cursor: "pointer" }} onClick={() => setEditPurchase(d)} />
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

      <AddOrEditPurchase addPurchase={addPurchase} setErrorToaster={setErrorToaster} type={type} editPurchase={editPurchase} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />

    </Grid>
  )
}

export default withAuth(Purchase)
