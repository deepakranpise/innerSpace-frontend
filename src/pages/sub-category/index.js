
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
import AddOrEditSubCategory from 'src/views/AddOrEditSubCategory'
import withAuth from 'src/hoc/withAuth'
import axiosInstance from 'src/hoc/axios'


const SubCategory = () => {

  const [SubCategoryData, setSubCategoryData] = useState([]);

  const [toaster, setToaster] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState(null);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditSubCategory(null)
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
      axiosInstance.get("subCategory/get")
        .then(res => {
          setSubCategoryData(res.data.data);
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
            Add SubCategory
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return ( */}

                  {SubCategoryData.map(d => (
                    <TableRow hover role='checkbox' tabIndex={-1} key={d.id}>
                      <TableCell key={d.id} align="left">
                        {d.name}
                      </TableCell>
                      <TableCell key={d.id} align="left">
                        {d.categoryId.name}
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

      <AddOrEditSubCategory open={open} handleClickOpen={handleClickOpen} setEditSubCategory={setEditSubCategory} editSubCategory={editSubCategory} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />

    </Grid>
  )

}

export default withAuth(SubCategory);
