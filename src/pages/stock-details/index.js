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
import { Alert, Autocomplete, Button, MenuItem, Snackbar } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'




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
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import { Icon } from '@iconify/react'
import { Box } from 'mdi-material-ui'
import moment from 'moment/moment';

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const StockDetails = () => {

  const [data, setData] = useState([]);
  const router = useRouter();

  //1 for puchase 0 for sell
  const [type, setType] = useState(1);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));


  const [toaster, setToaster] = useState(false);
  const [errorToaster, setErrorToaster] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [product, setProduct] = useState('');


  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);


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

  useEffect(() => {

    try {
      axiosInstance.get("category/get").then((res) => {
        if (res.data.status === 200) {
          setCategories(res.data.data);
        }
      })
        .catch(err => {
          console.log(err)
        })

      axiosInstance.get("subCategory/get").then((res) => {
        if (res.data.status === 200) {
          setSubCategories(res.data.data);
        }
      })
        .catch(err => {
          console.log(err)
        })

      axiosInstance.get("product/get?distinct=true").then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.data);
        }
      })
        .catch(err => {
          console.log(err)
        })
    }
    catch (err) {
      console.log(err)
    }
  }, [])

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

  const applyFilters = () => {
    try {
      axiosInstance.get(`transaction/get?categoryId=${category ? category : ''}&subCategoryId=${subCategory ? subCategory : ''}&productId=${product ? product : ''}&startDate=${startDate ? startDate : ''}&endDate=${endDate ? endDate : ''}`)
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
        <Card>
          <CardHeader titleTypographyProps={{ variant: 'h6' }} />
          <Grid>
            <FormControl sx={{ marginLeft: '10px', width: '15%' }}>
              {/* <InputLabel id='category'>Category</InputLabel> */}
              {/* <Select
                label='Category'
                name="category"
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(c => (
                  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                ))}
              </Select> */}

              <Autocomplete
                options={categories}
                getOptionLabel={option => option.name}
                name="party"
                required
                onChange={(e, values) => setCategory(values?._id)}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="category"
                    variant="standard"
                    label="Category Name"
                    placeholder="Favorites"
                    margin="normal"

                  />
                )}
              />

            </FormControl>
            {/* <FormControl sx={{ marginLeft: '10px', width: '15%' }}> */}
            {/* <InputLabel id='category'>Sub-Category</InputLabel> */}
            {/* <Select
                label='Category'
                name="category"
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {subCategories.map(c => (
                  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                ))}
              </Select> */}

            {/* <Autocomplete
                options={subCategories}
                getOptionLabel={option => option.name}
                name="subCategory"
                required
                onChange={(e, values) => setSubCategory(values?._id)}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="subCategory"
                    variant="standard"
                    label="Sub Category"
                    placeholder="Favorites"
                    margin="normal"

                  />
                )}
              /> */}

            {/* </FormControl> */}

            <FormControl sx={{ marginLeft: '10px', width: '15%' }}>
              {/* <Select
                label='Category'
                name="category"
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                {products.map(c => (
                  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                ))}
              </Select> */}

              <Autocomplete
                options={products}
                getOptionLabel={option => option.name}
                name="party"
                required
                onChange={(e, values) => setProduct(values?._id)}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="product"
                    variant="standard"
                    label="Product Name"
                    placeholder="Favorites"
                    margin="normal"

                  />
                )}
              />
            </FormControl>

            <FormControl sx={{ marginLeft: '10px' }}>
              <TextField
                fullWidth
                required
                name='date'
                type='date'
                label='Start Date'
                placeholder='Date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ marginLeft: '10px' }}>
              <TextField
                fullWidth
                required
                name='date'
                type='date'
                label='End Date'
                placeholder='Date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>


            <Button variant="outlined" sx={{ margin: '10px', marginLeft: '10px' }} onClick={applyFilters}>
              Apply
            </Button>
            <FormControl sx={{ float: 'right' }}>
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
            </FormControl>
          </Grid>


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

                  {(searchValue ? filteredData : data).length === 0 && (
                    <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', margin: "20px" }}>
                      <Typography>No Data Found</Typography>
                    </Grid>)}

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
      </Grid >

      <AddOrEditPurchase addPurchase={addPurchase} setErrorToaster={setErrorToaster} type={type} editPurchase={editPurchase} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />

    </Grid >
  )
}

export default withAuth(StockDetails)
