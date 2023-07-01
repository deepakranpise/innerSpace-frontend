
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Menu, MenuItem, Snackbar } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { MdModeEditOutline } from 'react-icons/md'
import AddOrEditProductMaster from 'src/views/AddOrEditProductMaster'
import withAuth from 'src/hoc/withAuth'
import axiosInstance from 'src/hoc/axios'
import { ReflectHorizontal } from 'mdi-material-ui'
import FallbackSpinner from 'src/@core/components/spinner'


const Master = () => {

  const [masterData, setMasterData] = useState([]);

  const [toaster, setToaster] = useState(false);
  const [errorToaster, setErrorToaster] = useState(false);
  const [editMaster, setEditMaster] = useState(null);
  const uploadInputRef = useRef(null);
  const [loading, setLoading] = useState(false);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMaster(null)
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



  return (
    <Grid container spacing={6}>
      <Snackbar open={toaster} autoHideDuration={6000} onClose={handleCloseToaster} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} style={{ top: "10%" }}>
        <Alert onClose={handleCloseToaster} severity="success" sx={{ width: '100%' }}>
          Product added successfully
        </Alert>
      </Snackbar>

      <Snackbar open={errorToaster} autoHideDuration={6000} onClose={handleCloseToaster} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} style={{ top: "10%" }}>
        <Alert onClose={handleCloseToaster} severity="error" sx={{ width: '100%' }}>
          Error While Adding Product
        </Alert>
      </Snackbar>
      <Grid item xs={12}>

        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Add Product
          </Button> */}
          <Button
            id="demo-positioned-button"
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return ( */}
                    {masterData.length === 0 && (
                      <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', margin: "20px" }}>
                        <Typography>No Data Found</Typography>
                      </Grid>)}

                    {masterData.length > 0 && masterData.map(d => (
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
                          {d.subCategoryId.name}
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
