
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
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
import AddOrEditProductMaster from 'src/views/AddOrEditProductMaster'


const Master = () => {

  const [masterData, setMasterData] = useState([]);

  const [toaster, setToaster] = useState(false);
  const [editMaster, setEditMaster] = useState(null);


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
  }


  useEffect(() => {
    fetch();
  }, [])

  const fetch = () => {
    try {
      axios.get("http://localhost:3100/product/get?distinct=true", { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0N2I3OWU1ZGUyMDJiMmYxMTMyY2Y4ZSIsImZpcnN0TmFtZSI6IkRlZXBhayIsImxhc3ROYW1lIjoiTWFuZSIsInVzZXJOYW1lIjoibWFuZWRlZXAyMDAxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiRGVlcGFrIiwiX192IjowfSwiaWF0IjoxNjg1ODE0MDYxLCJleHAiOjE3MTczNTAwNjF9.MBjwAcICyBmAL6O0oxMcD8P_stCpfgWdMEs_vliM8T0' } })
        .then(res => {
          setMasterData(res.data.data);
        })
        .catch(err => {
          console.log(err)
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
          Stock added successfully
        </Alert>
      </Snackbar>
      <Grid item xs={12}>

        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Product
          </Button>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ minWidth: 100 }}>
                      Name
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

                  {masterData.map(d => (
                    <TableRow hover role='checkbox' tabIndex={-1} key={d.id}>
                      <TableCell key={d.id} align="left">
                        {d.name}
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
        </Card>
      </Grid>

      <AddOrEditProductMaster open={open} handleClickOpen={handleClickOpen} setEditMaster={setEditMaster} editMaster={editMaster} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />

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

export default Master;
