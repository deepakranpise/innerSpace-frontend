import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdModeEditOutline } from 'react-icons/md'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import axiosInstance from 'src/hoc/axios';

const SellStock = ({ handleClickOpen, handleClose, handleOpenToaster, fetch, stock }) => {

  const [name, setName] = useState("");
  const [sizeQuantity, setSizeQuantity] = useState([]);

  const [btnCount, setBtnCount] = useState(1);

  // const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [invoice, setInvoice] = useState("");
  const [party, setParty] = useState("");

  React.useEffect(() => {
    // reset()
    if (stock) {
      setSizeQuantity(stock.type)

      // stock.type.forEach(element => {
      //   let newfield = { size: element.size, quantity: 0 }
      //   setSizeQuantity([...sizeQuantity, newfield])
      // });
    }
  }, [stock])

  const handleSubmit = () => {
    try {
      const data = {
        name: name,
        type: sizeQuantity,
        invoiceNo: invoice,
        party: party
      }
      axiosInstance.post("stocks", data)
        .then(res => {
          console.log(res.data.data);
          reset();
          handleClose();
          handleOpenToaster();
          fetch();
        })
        .catch(err => {
          console.log(err)
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  const reset = () => {
    setSizeQuantity([])
  }

  const handleSizeQuantity = (index, e) => {
    let data = [...sizeQuantity];
    data[index]['newQuantity'] = e.target.value;
    setSizeQuantity(data);
  }

  const addSizeQuantity = () => {
    let newfield = { size: '', quantity: '', newQuantity: '' }
    setSizeQuantity([...sizeQuantity, newfield])
  }

  const deleteSizeQuantity = (index) => {
    let data = [...sizeQuantity];
    data.splice(index, 1)
    setSizeQuantity(data)
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={stock && true} onClose={handleClose}>
        <DialogTitle>{stock?.name}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <Grid container spacing={5} component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: "max" },
              }}
              noValidate
              autoComplete="off">

              {sizeQuantity.map((q, index) => (<>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    disabled
                    name='size'
                    type='text'
                    label='Size'
                    placeholder='carterleonard@gmail.com'
                    value={q.size}
                    onChange={(e) => handleSizeQuantity(index, e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    name='quantity'
                    type='number'
                    inputProps={{ min: "1", max: q.quantity, step: "1" }}
                    label='Quantity'
                    value={q.newQuantity}
                    onChange={(e) => handleSizeQuantity(index, e)}
                  />
                </Grid>
              </>
              ))}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"
            onClick={handleSubmit}
          >Sell</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SellStock;
