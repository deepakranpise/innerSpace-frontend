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
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);




  const fetch = () => {
    try {
      axiosInstance.get("/stocks/get?categoryId=64b5337ba4ca8ba5e3d614dc&subCategoryId=64b533f1a4ca8ba5e3d614e8")
        .then(res => {
          if (res.data.status === 200) {
            // alert("here")
            console.log("stocks data ", res.data.data);
            setData(res.data.data);
          }
          else {
            setData([]);
          }
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
        .then(ress => {
          if (ress.data.status === 200) {
            setCategories(ress.data.data)
            setCategory(ress.data.data[0]);

            axiosInstance.get("size/get",)
              .then(res => {
                console.log("the sizes ", res.data.data)
                setColumns(res.data.data);
                setFilteredColumns(columns.filter(c => c.categoryId[0]._id === res.data.data[0]._id))
              })
              .catch(err => {
                console.log(err)
              })

            axiosInstance.get("subCategory/get",)
              .then(res => {
                console.log("the subcategories ", res.data.data)
                setSubCategories(res.data.data);
                setFilteredSubCategories(res.data.data.filter(d => d.categoryId[0]._id === ress.data.data[0]._id));
                setSubCategory(res.data.data.filter(d => d.categoryId[0]._id === ress.data.data[0]._id)[0]);
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
      setFilteredSubCategories([])

      return;
    }
    setCategory(values)

    let col = columns.filter(c => c.categoryId[0]._id === values._id);
    setFilteredColumns(col);

    // let data1 = {};
    // for (const key in data) {
    //   let data1 = data.filter(d => d.categoryId === values._id);
    // }

    let subCat = subCategories.filter(c => c.categoryId[0]._id === values._id)
    setFilteredSubCategories(subCat)

  }

  const handleSubCategoryChange = (e, values) => {
    if (values === null) {
      setFilteredSubCategories([])

      return;
    }
    setSubCategory(values)


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

          <Table data={data} columns={columns} handleCategoryChange={handleCategoryChange} handleSubCategoryChange={handleSubCategoryChange} subCategory={subCategory} filteredColumns={filteredColumns} categories={categories} filteredSubCategories={filteredSubCategories} subCategories={subCategories} category={category} fetch={fetch} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default withAuth(Dashboard);
