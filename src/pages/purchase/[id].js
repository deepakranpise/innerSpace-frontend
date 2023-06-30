// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axiosInstance from 'src/hoc/axios'
import FallbackSpinner from 'src/@core/components/spinner'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Button } from '@mui/material'
import { IoChevronBackOutline } from 'react-icons/io';


const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

const Detail = (props) => {

  const router = useRouter()
  const { id } = router.query

  if (!id) return <FallbackSpinner />

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch();
  }, [])

  const fetch = () => {
    try {
      axiosInstance.get(`transaction/get/${id}`)
        .then(res => {
          if (res.data.status === 200 && res.data.data) {
            console.log(res.data.data)
            setData(res.data.data);
          } else {
            router.push('/purchase')
          }
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
      <Grid item xs={12}>
        <Card>
          <Button variant="outlined" onClick={() => router.push('/purchase')}>
            Go Back
          </Button>
          <CardHeader title={'Invoice Details - ' + data?.id} titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Date</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
                  {data?.invoiceDate?.slice(0, 10)}
                </Typography>
              </DemoGrid>

              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Invoice No.</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
                  {data?.id}
                </Typography>
              </DemoGrid>

              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Type</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
                  {data?.type}
                </Typography>
              </DemoGrid>

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
                          Size
                        </TableCell>
                        <TableCell align="left" sx={{ minWidth: 100 }}>
                          Quantity
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {data && data?.products?.map(p => (

                        <TableRow hover role='checkbox' tabIndex={-1} key={p._id}>
                          <TableCell key={data._id} align="left">
                            {p?.productId?.name}
                          </TableCell>
                          <TableCell key={data.id} align="left">
                            {p?.productId?.code}
                          </TableCell>
                          <TableCell key={data.id} align="left">
                            {p?.productId?.subCategoryId?.categoryId?.name}
                          </TableCell>
                          <TableCell key={data.id} align="left">
                            {p?.productId?.subCategoryId?.name}
                          </TableCell>
                          <TableCell key={data.id} align="left">
                            {p?.productId?.size}
                          </TableCell>
                          <TableCell key={data.id} align="left">
                            {p?.quantity}
                          </TableCell>

                        </TableRow>
                      ))}

                      {/* })} */}

                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>









            </Grid>
          </CardContent>
        </Card>

      </Grid>
    </Grid>
  )
}

export default Detail
