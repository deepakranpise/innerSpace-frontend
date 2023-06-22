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
import AddOrEditPurchase from 'src/views/AddorEditPurchase'

const MUITable = () => {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [toaster, setToaster] = useState(false);
  const [editStock, setEditStock] = useState(null);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditStock(null)
  };

  const handleOpenToaster = () => {
    setToaster(true);
  }

  const handleCloseToaster = () => {
    setToaster(false);
  }

  const fetch = () => {
    try {
      axios.get("http://localhost:3100/stocks/get", { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0N2I3OWU1ZGUyMDJiMmYxMTMyY2Y4ZSIsImZpcnN0TmFtZSI6IkRlZXBhayIsImxhc3ROYW1lIjoiTWFuZSIsInVzZXJOYW1lIjoibWFuZWRlZXAyMDAxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiRGVlcGFrIiwiX192IjowfSwiaWF0IjoxNjg1ODE0MDYxLCJleHAiOjE3MTczNTAwNjF9.MBjwAcICyBmAL6O0oxMcD8P_stCpfgWdMEs_vliM8T0' } })
        .then(res => {
          console.log(res.data.data)
          setData(res.data.data);
          setColumns(res.data.columns)
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
          Stock added successfully
        </Alert>
      </Snackbar>
      <Grid item xs={12}>

        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Stock
          </Button>
          <TableStickyHeader setEditStock={setEditStock} columns={columns} editStock={editStock} data={data} />
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCollapsible />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Spanning Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableSpanning />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCustomized />
        </Card>
      </Grid> */}
      <AddOrEditPurchase open={open} handleClickOpen={handleClickOpen} setEditStock={setEditStock} editStock={editStock} handleClose={handleClose} handleOpenToaster={handleOpenToaster} fetch={fetch} />

    </Grid>
  )
}

export default MUITable
