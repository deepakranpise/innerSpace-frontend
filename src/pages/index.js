// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import { useEffect, useState } from 'react'
import axios from 'axios'
import withAuth from '../hoc/withAuth';
import axiosInstance from 'src/hoc/axios'
import FallbackSpinner from 'src/@core/components/spinner'

const Dashboard = () => {

  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])



  const fetch = () => {
    try {
      axiosInstance.get("/stocks/get")
        .then(res => {
          console.log("from dashboard ", res.data.data)
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
    try {
      axiosInstance.get("size/get",)
        .then(res => {
          console.log(res.data.data)
          setColumns(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    }
    catch (err) {
      console.log(err)
    }
  }, [])


  useEffect(() => {
    fetch();
  }, [])

  if (data.length === 0)  return <FallbackSpinner />;

return (
  <ApexChartWrapper>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          Todays Stock
        </div>
      </Grid>
      <Grid item xs={12}>
        <Table data={data} columns={columns} fetch={fetch} />
      </Grid>
    </Grid>
  </ApexChartWrapper>
)
}

export default withAuth(Dashboard);
