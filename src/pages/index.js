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

const Dashboard = () => {

  const [data, setData] = useState([])
  const [columns, setColumns] = useState(["2x6", "4x6", "5x6", "6x6", "6x7", "3x6", "1.5x3"])



  const fetch = () => {
    try {
      axios.get("http://localhost:3100/stocks/get", { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0N2I3OWU1ZGUyMDJiMmYxMTMyY2Y4ZSIsImZpcnN0TmFtZSI6IkRlZXBhayIsImxhc3ROYW1lIjoiTWFuZSIsInVzZXJOYW1lIjoibWFuZWRlZXAyMDAxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiRGVlcGFrIiwiX192IjowfSwiaWF0IjoxNjg1ODE0MDYxLCJleHAiOjE3MTczNTAwNjF9.MBjwAcICyBmAL6O0oxMcD8P_stCpfgWdMEs_vliM8T0' } })
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
      axios.get("http://localhost:3100/size/get", { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0N2I3OWU1ZGUyMDJiMmYxMTMyY2Y4ZSIsImZpcnN0TmFtZSI6IkRlZXBhayIsImxhc3ROYW1lIjoiTWFuZSIsInVzZXJOYW1lIjoibWFuZWRlZXAyMDAxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiRGVlcGFrIiwiX192IjowfSwiaWF0IjoxNjg1ODE0MDYxLCJleHAiOjE3MTczNTAwNjF9.MBjwAcICyBmAL6O0oxMcD8P_stCpfgWdMEs_vliM8T0' } })
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

export default Dashboard
