
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, FormControl, Menu, MenuItem, Snackbar, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { MdModeEditOutline } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

import AddOrEditProductMaster from 'src/views/AddOrEditProductMaster'
import withAuth from 'src/hoc/withAuth'
import axiosInstance from 'src/hoc/axios'
import { ReflectHorizontal } from 'mdi-material-ui'
import FallbackSpinner from 'src/@core/components/spinner'
import { Icon } from '@iconify/react'
import { Box } from 'mdi-material-ui'
import DeleteModal from 'src/views/DeleteModal'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Master = () => {

  const [masterData, setMasterData] = useState([]);

  const [toaster, setToaster] = useState(null);
  const [errorToaster, setErrorToaster] = useState(null);
  const [editMaster, setEditMaster] = useState(null);
  const uploadInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMaster(null);
    setDeleteItem(null);
  };

  const handleOpenToaster = () => {
    setToaster(true);
  }

  const handleCloseToaster = () => {
    setToaster(false);
    setErrorToaster(false);
  }


  useEffect(() => {
    fetch();
  }, [])

  const fetch = () => {
    setLoading(true);

    try {
      axiosInstance.get("product/get?distinct=true")
        .then(res => {
          setMasterData(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        })
    }
    catch (err) {
      console.log(err)
      setLoading(false);
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const openEl = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onFileUpload = (e) => {
    handleCloseMenu();
    setLoading(true);
    console.log(e.target.files[0]);
    try {
      const fd = new FormData();
      fd.set("uploadfile", e.target.files[0]);

      axiosInstance.post("/product/bulkUpload", fd)
        .then(res => {
          if (res.data.status === 200) {
            setToaster(res.data.message);
            fetch()
            setLoading(false);
          } else {
            setLoading(false);
            setErrorToaster(res.data.message);
          }
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSearch = value => {
    setSearchValue(value)

    const searchRegex = new RegExp(escapeRegExp(value), 'i')

    const filteredRows = masterData.filter(row => {
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

  const deleteProduct = () => {
    try {
      axiosInstance.put('product/delete', { id: deleteItem._id })
        .then(res => {
          if (res.data.status === 200) {
            setToaster(res.data.message);
            setDeleteItem(null);
            fetch();

            // setLoading(false);
          } else {
            // setLoading(false);
            setErrorToaster(res.data.message);
          }
        })
        .catch(err => {
          // setLoading(false);
          setErrorToaster(err);
        })
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <Grid container spacing={6}>
      <Snackbar open={toaster} autoHideDuration={6000} onClose={handleCloseToaster} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} style={{ top: "10%" }}>
        <Alert onClose={handleCloseToaster} severity="success" sx={{ width: '100%' }}>
          {toaster}
        </Alert>
      </Snackbar>

      <Snackbar open={errorToaster} autoHideDuration={6000} onClose={handleCloseToaster} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} style={{ top: "10%" }}>
        <Alert onClose={handleCloseToaster} severity="error" sx={{ width: '100%' }}>
          {errorToaster}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>

        <Card>
          <CardHeader title='Products Master' titleTypographyProps={{ variant: 'h6' }} />
          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Add Product
          </Button> */}
          <Button
            id="demo-positioned-button"
            variant='outlined'
            sx={{ marginLeft: '10px' }}
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Add Product
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openEl}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClickOpen}>Add Single</MenuItem>
            <MenuItem onClick={() => uploadInputRef.current && uploadInputRef.current.click()} >Bulk Upload </MenuItem>
          </Menu>
          <input
            ref={uploadInputRef}
            type="file"
            style={{ display: "none" }}
            accept=".csv"
            onChange={onFileUpload}
          />

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

          {loading ? <FallbackSpinner /> : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ minWidth: 100 }}>
                        Name
                      </TableCell>
                      <TableCell align="left" sx={{ minWidth: 100 }}>
                        Code
                      </TableCell>
                      <TableCell align="left" sx={{ minWidth: 100 }}>
                        Category
                      </TableCell>
                      <TableCell align="left" sx={{ minWidth: 100 }}>
                        Sub-Category
                      </TableCell>
                      <TableCell align="left" sx={{ minWidth: 100 }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return ( */}
                    {(searchValue ? filteredData : masterData).length === 0 && (
                      <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', margin: "20px" }}>
                        <Typography>No Data Found</Typography>
                      </Grid>)}

                    {(searchValue ? filteredData : masterData).map(d => (
                      <TableRow hover role='checkbox' tabIndex={-1} key={d.id}>
                        <TableCell key={d.id} align="left">
                          {d.name}
                        </TableCell>
                        <TableCell key={d.id} align="left">
                          {d?.code}
                        </TableCell>
                        <TableCell key={d.id} align="left">
                          {d.categoryId.name}
                        </TableCell>
                        <TableCell key={d.id} align="left">
                          {d?.subCategoryId?.name}
                        </TableCell>
                        <TableCell key={d.id} align="left">
                          <MdModeEditOutline color="#9155FD" size="20px" style={{ cursor: "pointer" }} onClick={() => setEditMaster(d)} />
                          <AiFillDelete color="rgb(238 31 31)" size="20px" style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => setDeleteItem(d)} />

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
          )}
        </Card>
      </Grid>

      <AddOrEditProductMaster open={open} setErrorToaster={setErrorToaster} handleClickOpen={handleClickOpen} setEditMaster={setEditMaster} editMaster={editMaster} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />
      <DeleteModal deleteItem={deleteItem} handleClose={handleClose} deleteProduct={deleteProduct} type='Product' />
    </Grid>
  )


  // return (
  //   <>
  //     <Grid container spacing={6}>

  //       <Grid item xs={12}>

  //         <Card>
  //           <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
  //           <Button variant="outlined" onClick={() => alert('h')}>
  //             Add Stock
  //           </Button>
  //            </Card>
  //       </Grid>

  //     </Grid>

  //     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
  //       <TableContainer sx={{ maxHeight: 440 }}>
  //         <Table stickyHeader aria-label='sticky table'>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell align="left" sx={{ minWidth: 100 }}>
  //                 Name
  //               </TableCell>

  //               <TableCell align="left" sx={{ minWidth: 100 }}>
  //                 Code
  //               </TableCell>
  //               <TableCell align="left" sx={{ minWidth: 100 }}>
  //                 Category
  //               </TableCell>
  //               <TableCell align="left" sx={{ minWidth: 100 }}>
  //                 Sub-Category
  //               </TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
  //             return ( */}

  //             {masterData.map(d => (
  //               <TableRow hover role='checkbox' tabIndex={-1} key={d.id}>
  //                 <TableCell key={d.id} align="left">
  //                   {d.productName}
  //                 </TableCell>
  //                 <TableCell key={d.id} align="left">
  //                   {d.productCode}
  //                 </TableCell>
  //                 <TableCell key={d.id} align="left">
  //                   {d.category}
  //                 </TableCell>
  //                 <TableCell key={d.id} align="left">
  //                   {d.subCategory}
  //                 </TableCell>


  //               </TableRow>
  //             ))}

  //             {/* })} */}

  //           </TableBody>
  //         </Table>
  //       </TableContainer>

  //       {/* <TablePagination
  //       rowsPerPageOptions={[10, 25, 100]}
  //       component='div'
  //       count={data.length}
  //       rowsPerPage={rowsPerPage}
  //       page={page}
  //       onPageChange={handleChangePage}
  //       onRowsPerPageChange={handleChangeRowsPerPage}
  //     /> */}
  //     </Paper>
  //   </>
  // )
}

export default withAuth(Master);
