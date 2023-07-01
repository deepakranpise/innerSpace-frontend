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


const DashboardTable = ({ data, columns, fetch }) => {

  const [toaster, setToaster] = useState(false);
  const [editStock, setEditStock] = useState(null);

  const [stock, setStock] = useState(null);

  var arr = [];

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

  return (
    <>
      <Card>
        <CSVLink {...csvReport}
          style={{
            color: "rgb(105 57 191) !important",
            textDecoration: "none",
            fontWeight: "600",
            border: "1px solid",
            height: "35px",
            display: "flex",
            width: "70px",
            borderRadius: "2%",
            textAlign: "center",
            padding: "5px",
            float: "right",
            margin: "10px"
          }}
        >Export</CSVLink>
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
              {data.map(d => (
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
