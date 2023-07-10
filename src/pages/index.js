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
  const [categories, setCategories] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [category, setCategory] = useState([]);




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


      axiosInstance.get("category/get")
        .then(res => {
          if (res.data.status === 200) {
            setCategories(res.data.data)
            setCategory(res.data.data[0]);

            axiosInstance.get("size/get",)
              .then(res => {
                console.log("the sizes ", res.data.data)
                setColumns(res.data.data);
                setFilteredColumns(columns.filter(c => c.categoryId[0]._id === res.data.data[0]._id))
              })
              .catch(err => {
                console.log(err)
              })

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


  useEffect(() => {
    fetch();
  }, [])

  const handleCategoryChange = (e, values) => {

    if (values === null) {
      setFilteredColumns(columns.filter(c => c.categoryId[0]._id === categories[0]._id))

      return;
    }
    setCategory(values)

    let col = columns.filter(c => c.categoryId[0]._id === values._id);
    console.log("col ", col)
    setFilteredColumns(col)
  }

  if (!data) return <FallbackSpinner />;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div>

          </div>
        </Grid>
        <Grid item xs={12}>

          <Table data={data} columns={columns} handleCategoryChange={handleCategoryChange} filteredColumns={filteredColumns} categories={categories} category={category} fetch={fetch} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default withAuth(Dashboard);
