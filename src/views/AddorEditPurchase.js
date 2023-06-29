import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdModeEditOutline } from 'react-icons/md'
import { BsFillPlusCircleFill } from 'react-icons/bs';
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
import moment from 'moment/moment';

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


const AddOrEditPurchase = ({ addPurchase, setErrorToaster, type, handleClose, handleOpenToaster, fetch, editPurchase }) => {

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [products, setProducts] = useState([{ category: undefined, code: undefined, productId: undefined, quantity: undefined, filteredData: [] }]);

  const [productMaster, setProductMaster] = useState([]);

  // const categories = ['instant', 'odd']

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [invoice, setInvoice] = useState("");
  const [party, setParty] = useState("");
  const [invoiceError, setInvoiceError] = useState(false);
  const [partyError, setPartyError] = useState(false);
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [filteredData, setFilteredData] = useState([])
  const [parties, setParties] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));



  React.useEffect(() => {
    if (editPurchase) {
      // alert("yess")
      console.log(editPurchase)
      setInvoice(editPurchase.id);
      setParty(editPurchase.clientName);
    }
  })

  React.useEffect(() => {
    reset();
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
    axiosInstance.get("client/get")
      .then(res => {
        console.log(res.data.data)
        setParties(res.data.data)
      })

  }, [editPurchase])

  const handleSubmit = () => {

    if (!invoice || !party || !date) {
      if (!invoice) {
        setInvoiceError(true);
      }
      if (!party) {
        setPartyError(true);
      }
      if (!date) {
        setDateError(true);
      }

      return;
    }
    setInvoiceError(false);
    setPartyError(false);
    setDateError(false);
    setError(false);

    products.forEach(p => {
      console.log(p)
      if (p.category === '' || p.productId === '' || p.quantity === '') {
        alert("Please enter all product details!");
        setError(true);

        return;
      }
    })
    if (!error) {
      try {
        const data = {

          products: products,
          clientName: party,
          id: invoice,
          type: type ? "purchase" : "sell",
          invoiceDate: date
        }
        axiosInstance.post("transaction", data)
          .then(res => {
            if (res.data.status === 200) {
              reset();
              handleClose();
              handleOpenToaster();
              fetch();
            } else {
              setErrorToaster(true)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const reset = () => {
    setInvoiceError(false);
    setPartyError(false);
    setDateError(false);
    setError(false);
    setProducts([{ category: "", productId: "", code: "", size: "", quantity: "", filteredData: [] }])
    setParty("");
    setInvoice("");
    setDate(moment().format("YYYY-MM-DD"))

  }

  const handleSizeQuantity = (index, e) => {

    let data = [...products];
    if (e.target.name === 'productId') {

      let productCode = productMaster.filter(p => p._id === e.target.value);
      let data = [...products];
      if (productCode && productCode[0]?.code != data[index]['code']) {
        data[index]['code'] = productCode[0]?.code;
        setProducts(data);
      }
    }
    data[index][e.target.name] = e.target.value;
    setProducts(data);
  }

  const addSizeQuantity = () => {
    let newfield = { category: undefined, code: undefined, productId: undefined, quantity: undefined, filteredData: [] }
    setProducts([...products, newfield])
  }

  const deleteSizeQuantity = (index) => {
    let data = [...products];
    data.splice(index, 1)
    setProducts(data)
  }

  const handleProductCode = (e, index) => {
    let data = [...products];
    data[index]['code'] = e.target.value;
    setProducts(data);

    const searchRegex = new RegExp(escapeRegExp(e.target.value), 'i')

    const filteredRows = productMaster.filter(row => {
      return Object.keys(row).some(field => {

        // @ts-ignore

        return searchRegex.test(row['code'].toString())
      })
    })
    console.log(filteredRows)
    if (e.target.value.length) {
      if (filteredRows.length > 0) {

        let data = [...products];
        data[index]['productId'] = filteredRows[0]._id;
        data[index]['filteredData'] = filteredRows;
        setProducts(data);
      }

    } else {
      let data = [...products];
      data[index]['filteredData'] = [];
      setProducts(data);
    }
  }

  const markSegregated = (index) => {
    let data = [...products];
    data[index]['isSegregated'] = true;
    data[index]['from'] = '';
    data[index]['leftOver'] = '';
    setProducts(data);
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={addPurchase || editPurchase} onClose={handleClose} fullWidth={true}
        maxWidth={'md'}>
        <DialogTitle>Add {type ? "Purchase" : "Sell"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <Grid container spacing={5} component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: "max" },
              }}
              noValidate
              autoComplete="off">
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  required
                  name='date'
                  error={dateError}
                  type='date'
                  label='Date'
                  placeholder='Date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name='invoice'
                  error={invoiceError}
                  type='text'
                  label='Invoice No'
                  placeholder='invoice no.'
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='category'>Party Name</InputLabel>
                  <Select
                    label='Party'
                    name="party"
                    error={partyError}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                  >
                    {parties.map(c => (
                      <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    required
                    name='code'
                    type='text'
                    label='Code'
                    placeholder='product code'
                    value={q.code}
                    onChange={(e) => handleProductCode(e, index)}
                  />
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
                      {(q.filteredData.length > 0 ? q.filteredData : productMaster).map(p => (
                        <MenuItem key={p.name} value={p._id} >{p.name + "  " + p.size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {!type && q.productId && (
                    <a style={{ color: "#9155FD", float: "right", cursor: "pointer" }} onClick={() => markSegregated(index)}>Segregated</a>
                  )}


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
                {q?.isSegregated && (
                  <>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id='category'>From Product</InputLabel>
                        <Select
                          label='From Product'
                          name="from"
                          id='form-layouts-separator-select'
                          labelId='form-layouts-separator-select-label'
                          value={q.from}
                          onChange={(e) => handleSizeQuantity(index, e)}
                        >
                          {productMaster.filter(p => p.code === q.code && p._id != q.productId).map(p => (
                            <MenuItem key={p._id} value={p._id}>{p.name + "  " + p.size}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id='category'>Left Over</InputLabel>
                        <Select
                          label='From Product'
                          name="leftOver"
                          id='form-layouts-separator-select'
                          labelId='form-layouts-separator-select-label'
                          value={q.leftOver}
                          onChange={(e) => handleSizeQuantity(index, e)}
                        >
                          {productMaster.filter(p => p.code === q.code && p._id != q.productId).map(p => (
                            <MenuItem key={p._id} value={p._id}>{p.name + "  " + p.size}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                  </>
                )}
                <Grid item xs={2}>
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
                {(index > 0) && (
                  <Grid item xs={12}>
                    <AiFillDelete color="red" size="20px" style={{ cursor: "pointer" }} onClick={deleteSizeQuantity} />
                  </Grid>
                )}
              </>
              ))}

              <Grid item xs={6}>
                <BsFillPlusCircleFill color="#9155FD" size="20px" style={{ cursor: "pointer" }} onClick={addSizeQuantity} />
              </Grid>

            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Reset</Button>
          <Button type="submit"
            onClick={handleSubmit}
          >Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddOrEditPurchase;
