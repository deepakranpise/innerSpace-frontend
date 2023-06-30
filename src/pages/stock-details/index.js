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

import TextField from '@mui/material/TextField';

import AddOrEditPurchase from 'src/views/AddorEditPurchase'
import withAuth from 'src/hoc/withAuth'
import axiosInstance from 'src/hoc/axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import { Icon } from '@iconify/react'
import { Box } from 'mdi-material-ui'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const StockDetails = () => {

  const [data, setData] = useState([]);
  const router = useRouter();

  //1 for puchase 0 for sell
  const [type, setType] = useState(1);

  const [toaster, setToaster] = useState(false);
  const [errorToaster, setErrorToaster] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [filteredData, setFilteredData] = useState([]);


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

  const handleSearch = value => {
    setSearchValue(value)

    const searchRegex = new RegExp(escapeRegExp(value), 'i')

    const filteredRows = data.filter(row => {
      console.log(row);

      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (value.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
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
          <CardHeader titleTypographyProps={{ variant: 'h6' }} />

          <TextField
            size='small'
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            placeholder='Search…'
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),

              // endAdornment: (
              //   <IconButton size='small' title='Clear' aria-label='Clear' onClick={searchHandler}>
              //     <Icon icon='mdi:close' fontSize={20} />
              //   </IconButton>
              // )
            }}
            sx={{
              width: {
                xs: 1,
                sm: 'auto'
              },
              '& .MuiInputBase-root > svg': {
                mr: 2
              }
            }}
          />

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
                      <Typography variant='body2' sx={{ mt: 2 }}>
                        Sub-Category
                      </Typography>
                    </TableCell>
                    {/* <TableCell align="left" sx={{ minWidth: 100 }}>
                      Sub-Category
                    </TableCell> */}
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
                  {(searchValue ? filteredData : data).map(d => (

                    <TableRow hover role='checkbox' tabIndex={-1} key={d.id} style={{ cursor: "pointer" }}>

                      <TableCell key={data.id} align="left">
                        {moment(d.invoiceDate).format("YYYY-MM-DD")}
                      </TableCell>

                      <TableCell key={data.id} align="left">
                        {d.invoiceNo}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.clientName}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.category}
                        <Typography variant='body2' sx={{ mt: 2 }}>
                          {d.subCategory}
                        </Typography>
                      </TableCell>
                      {/* <TableCell key={data.id} align="left">
                          {d?.productId?.subCategoryId}
                        </TableCell> */}
                      <TableCell key={data.id} align="left">
                        {d.name + "-" + d.size}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.code}
                      </TableCell>
                      <TableCell key={data.id} align="left">
                        {d.type === "sell" ? d.quantity : '-'}
                      </TableCell>

                      <TableCell key={data.id} align="left">
                        {d.type === "purchase" ? d.quantity : '-'}
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

export default withAuth(StockDetails)
