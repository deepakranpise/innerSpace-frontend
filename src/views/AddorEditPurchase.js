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
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'
import axiosInstance from 'src/hoc/axios';




const AddOrEditPurchase = ({ open, setOpen, handleClickOpen, type, handleClose, handleOpenToaster, fetch, setEditPurchase, editPurchase }) => {

  const [name, setName] = useState("");
  const [products, setProducts] = useState([{ category: undefined, productId: undefined, quantity: undefined }]);

  const [productMaster, setProductMaster] = useState([]);

  // const categories = ['instant', 'odd']

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [invoice, setInvoice] = useState("");
  const [party, setParty] = useState("");

  React.useEffect(() => {
    console.log("editPurchase ", editPurchase)

    axiosInstance.get("product/get")
      .then(res => {
        console.log(res.data.data)
        setProductMaster(res.data.data)
      })

    axiosInstance.get("category/get")
      .then(res => {
        setCategories(res.data.data)
      })

    axiosInstance.get("size/get")
      .then(res => {
        setSizes(res.data.data)
        console.log(res.data.data)
      })

    if (editPurchase) {
      setName(editPurchase.name);
      setProducts(editPurchase.type)
      setInvoice(editPurchase.invoiceNo);
      setParty(editPurchase.party);
    }
  }, [editPurchase])

  const handleSubmit = () => {
    console.log(products)

    try {
      const data = {

        products: products,
        clientName: party,
        id: invoice,
        type: type ? "purchase" : "sell",
        invoiceDate: "2023/08/06/"
      }
      axiosInstance.post("transaction", data)
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
    setName("");
    setProducts([{ category: "", productId: "", code: "", size: "", quantity: "" }])
    setParty("");
    setInvoice("");

  }

  const handleSizeQuantity = (index, e) => {

    let data = [...products];
    data[index][(e.target.name) ? e.target.name : "productId"] = e.target.value;
    setProducts(data);
  }

  const addSizeQuantity = () => {
    let newfield = { category: "", productId: undefined, quantity: undefined }
    setProducts([...products, newfield])
  }

  const deleteSizeQuantity = (index) => {
    let data = [...products];
    data.splice(index, 1)
    setProducts(data)
  }



  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open || editPurchase} onClose={handleClose} fullWidth={true}
        maxWidth={'md'}>
        <DialogTitle>Add Purchase</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <Grid container spacing={5} component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: "max" },
              }}
              noValidate
              autoComplete="off">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name='invoice'
                  type='text'
                  label='Invoice No'
                  placeholder='invoice no.'
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name='party'
                  type='text'
                  label='Party Name'
                  placeholder='party name'
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <label>Add products</label>
              </Grid>

              {products.map((q, index) => (<>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id='category'>Category</InputLabel>
                    <Select
                      label='Category'
                      name="category"
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      value={q.category}
                      onChange={(e) => handleSizeQuantity(index, e)}
                    >
                      {categories.map(c => (
                        <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} >
                  <FormControl fullWidth>
                    <InputLabel id='product'>Product Name</InputLabel>
                    <Select
                      label='product name'
                      name="productId"
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      value={q.productId}
                      onChange={(e) => handleSizeQuantity(index, e)}
                    >
                      {productMaster.map(p => (
                        <MenuItem key={p.name} value={p._id} >{p.name + "  " + p.size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* <Autocomplete
                    id="productname"
                    name="product"
                    options={q.category && productMaster.filter(p => p.subCategory === q.category)[0]?.products}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    disabled={!q.category && true}
                    value={q.product}
                    onChange={(e) => handleSizeQuantity(index, e)}
                    renderOption={(props, option) => (
                      <Box component="li"  {...props}>
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product Name"
                        name="product"
                        value={q.product}
                        onChange={(e) => handleSizeQuantity(index, e)}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'productName', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  /> */}
                </Grid>
                {/* <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel id='category'>Size</InputLabel>
                    <Select
                      label='Size'
                      name="size"
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      value={q.size}
                      onChange={(e) => handleSizeQuantity(index, e)}
                    >
                      {sizes[0]?.size?.map(s => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    name='quantity'
                    type='text'
                    label='Quantity'
                    placeholder='carterleonard@gmail.com'
                    value={q.quantity}
                    onChange={(e) => handleSizeQuantity(index, e)}
                  />
                </Grid>
              </>
              ))}
              <Grid item xs={6}>
                <BsFillPlusCircleFill color="#9155FD" size="20px" style={{ cursor: "pointer" }} onClick={addSizeQuantity} />
              </Grid>

            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"
            onClick={handleSubmit}
          >Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddOrEditPurchase;
