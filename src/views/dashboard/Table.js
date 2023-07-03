// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { useEffect } from 'react'
import SellStock from '../sellStock'
import { useState } from 'react'
import { CSVLink } from "react-csv";
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Button, Menu, MenuItem, TextField } from '@mui/material'
import { Icon } from '@iconify/react'
import {SlOptionsVertical} from 'react-icons/sl'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const DashboardTable = ({ data, columns, fetch }) => {

  const [toaster, setToaster] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [editStock, setEditStock] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [stock, setStock] = useState(null);


  const [anchorEl, setAnchorEl] = useState(null);
  const openEl = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = (stock) => {
    setStock(stock);
  };

  const handleClose = () => {
    setStock(null)
  };

  const handleOpenToaster = () => {
    setToaster(true);
  }

  const handleCloseToaster = () => {
    setToaster(false);
  }

  const getHeaders = () => {
    const headers = [
      { label: "Name", key: "_id" },
    ];

    columns[0]?.size?.forEach(element => {
      headers.push({ label: element, key: element })
    });

    return headers
  }


  const csvReport = {
    data: data,
    headers: getHeaders(),
    filename: "stocks",
  };

  const handleSearch = value => {
    setSearchValue(value)

    const searchRegex = new RegExp(escapeRegExp(value), 'i')

    const filteredRows = data.filter(row => {
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

  return (
    <>
      <Card>
        <Button
          id="demo-positioned-button"

          // variant='outlined'
          sx={{ marginTop: '15px', float: 'right' }}
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <SlOptionsVertical />
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
          <MenuItem > <CSVLink {...csvReport}
          style={{
            // color: "rgb(105 57 191) !important",
            textDecoration: "none",
            color:'#111'

            // fontWeight: "600",
            // border: "1px solid",
            // height: "35px",
            // display: "flex",
            // width: "70px",
            // borderRadius: "2%",
            // textAlign: "center",
            // padding: "5px",
            // margin: "10px"
          }}
        >Export</CSVLink></MenuItem>
        </Menu>
        <FormControl sx={{ float: 'right',marginTop: '10px' }}>
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




        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {/* <TableCell>Size</TableCell>
                <TableCell>Qty</TableCell> */}
                {columns[0]?.size?.map(c => (
                  <TableCell key={c}>{c}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(searchValue ? filteredData : data).map(d => (
                <TableRow hover key={d.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell key={d.id} align="left"> {d._id}
                  </TableCell>
                  {/* {columns.map((u, index) => (
                    <TableCell key={u} align="left">
                      {u}
                    </TableCell>
                  ))} */}
                  {/* {d.data.map(qty => ( */}
                  {/* <TableCell align="left">
                        {d.size}
                      </TableCell> */}
                  {columns[0]?.size?.map(c => (
                    <TableCell key={c}>{d[c] || "-"}</TableCell>
                  ))}

                  {/* <TableCell>{d.email}</TableCell> */}
                  {/* <TableCell>{d.date}</TableCell>
                <TableCell>{d.salary}</TableCell>
                <TableCell>{d.age}</TableCell> */}
                  {/* <TableCell>
                    <Chip
                      label='sell'
                      color={statusObj['professional'].color}
                      sx={{
                        cursor: "pointer",
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                      onClick={() => handleClickOpen(d)}
                    />

                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card >
      <SellStock handleClose={handleClose} stock={stock} />
    </>
  )
}

export default DashboardTable
