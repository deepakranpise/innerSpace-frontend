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




const AddOrEditCategory = ({ open, setOpen, setErrorToaster, handleClickOpen, handleClose, handleOpenToaster, fetch, setEditCategory, editCategory }) => {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const [categories, setCategories] = useState([]);


  React.useEffect(() => {
    axiosInstance.get("category/get").then((res) => {
      if (res.data.status === 200) {
        setCategories(res.data.data);
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  React.useEffect(() => {
    console.log("editCategory ", editCategory)
  }, [editCategory])

  const handleSubmit = () => {
    if (!name || !category) {
      if (!name) {
        setNameError(true);
      }
      if (!category) {
        setCategoryError(true);
      }

      return;
    }
    setNameError(false);
    setCategoryError(false);
    try {
      const data = {
        name: name,
        categoryId: category
      }
      axiosInstance.post("subCategory", data)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
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
    setCategory("");
  }

  return (
    <div>

      <Dialog open={open || editCategory} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
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
                  error={nameError}
                  name='SubCategoryName'
                  type='text'
                  label='SubCategory Name'
                  placeholder='SubCategory name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='category'>Category</InputLabel>
                  <Select
                    label='Category'
                    error={categoryError}
                    name="category"
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map(c => (
                      <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))}
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
          >Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddOrEditCategory;
