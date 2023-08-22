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




const AddOrEditProductMaster = ({ open, setOpen, setErrorToaster, handleClickOpen, handleClose, handleOpenToaster, fetch, setEditMaster, editMaster }) => {




  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [nameError, setNameError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);


  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);


  React.useEffect(() => {
    if (editMaster) {
      setName(editMaster.name);
      setCode(editMaster.code);
      setCategory(editMaster.categoryId._id);
      setSubCategory(editMaster.subCategoryId._id);
    } else {
      setName('');
      setCode('');
      setCategory('');
      setSubCategory('');
    }
  }, [editMaster])

  React.useEffect(() => {
    axiosInstance.get("category/get").then((res) => {
      if (res.data.status === 200) {

        setCategories(res.data.data)
      }
    })
      .catch(err => {
        console.log(err)
      })
    axiosInstance.get("subCategory/get").then((res) => {
      if (res.data.status === 200) {

        setSubCategories(res.data.data)
        let filter = res.data.data.filter(s => s.categoryId[0]._id === editMaster?.categoryId?._id);
        setFilteredSubCategories(filter);
      }
    })
      .catch(err => {
        console.log(err)
      })
  }, [editMaster?.categoryId?._id])


  const handleSubmit = () => {

    if (!name || !code || !category || (filteredSubCategories.length > 0 && !subCategory)) {
      if (!name) {
        setNameError(true);
      }
      if (!code) {
        setCodeError(true);
      }
      if (!category) {
        setCategoryError(true);
      }
      if (filteredSubCategories.length > 0 && !subCategory) {
        setSubCategoryError(true);
      }

      return;
    }

    setNameError(false);
    setCodeError(false);
    setCategoryError(false);
    setSubCategoryError(false);


    try {
      const data = {

        name: name,
        code: code,
        categoryId: category,
        subCategoryId: subCategory
      }

      if (editMaster) {
        data.id = editMaster._id
      }
      (open ? axiosInstance.post("product", data) : axiosInstance.put("product/update", data))
        .then(res => {
          if (res.data.status === 200) {
            reset();
            handleClose();
            handleOpenToaster();
            fetch();
          } else {
            setErrorToaster(true);
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

  const reset = () => {
    setName("");
    setCode("");
    setCategory("");
    setSubCategory("");
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    let filter = subCategories.filter(s => s.categoryId[0]._id === e.target.value);
    setFilteredSubCategories(filter);
    console.log("first ", filter)
    if (e.target.value === editMaster.categoryId._id)
      setSubCategory(editMaster.subCategoryId._id)

    else
      setSubCategory(filter[0]._id)
  }

  return (
    <div>

      <Dialog open={open || editMaster} onClose={handleClose}>
        <DialogTitle>{open ? 'Add' : editMaster && 'Update'} Master</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <Grid container spacing={5} component="form"
              validate
              sx={{
                '& .MuiTextField-root': { m: 1, width: "max" },
              }}
              autoComplete="off">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  error={nameError}
                  name='ProductName'
                  type='text'
                  label='Product Name'
                  placeholder='Product name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  required
                  error={codeError}
                  name='ProductCode'
                  type='text'
                  label='Product Code'
                  disabled={editMaster && true}
                  placeholder='Product code'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='Size'>Category</InputLabel>
                  <Select
                    label='Category'
                    required
                    error={categoryError}
                    name="Category"
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    {categories.map(c => (
                      <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='Size'>Sub Category</InputLabel>
                  <Select
                    required={filteredSubCategories.length > 0 && true}
                    error={subCategoryError}
                    label='Sub Category'
                    name="subCategory"
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={subCategory}
                    disabled={filteredSubCategories.length === 0 && true}
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    {(filteredSubCategories.map(c => (
                      <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    )))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"
            onClick={handleSubmit}
          >{open ? 'Add' : editMaster && 'Update'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddOrEditProductMaster;
