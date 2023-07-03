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
import axiosInstance from 'src/hoc/axios';



const AddOrEditSizes = ({ open, setOpen, handleClickOpen, handleClose, handleOpenToaster, fetch, setEditSize, editSize, setErrorToast }) => {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [sizeError, setSizeError] = useState(false);



  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [count, setCount] = useState(1);


  React.useEffect(() => {
    axiosInstance.get("category/get").then((res) => {
      if (res.data.status === 200) {
        setCategories(res.data.data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  React.useEffect(() => {
    console.log("editSize ", editSize)
  }, [editSize])


  const addSizes = (value, index) => {
    let size = sizes;

    size[index] = value;
    setSizes(size);
  }

  const handleSubmit = () => {
    if (sizes.length != count || !category) {
      if (!name) {
        setNameError(true);
      }
      if (!category) {
        setCategoryError(true);
      }

      return;
    }
    setSizeError(false);
    sizes.forEach(s => {
      if (s === '' || s === null || s === undefined) {
        setNameError(true);
        alert("fill all sizes");
        setSizeError(true);

        return;
      }
    });
    if (sizeError) {
      return;
    }

    console.log(sizes)
    setNameError(false);
    setCategoryError(false);

    try {
      const data = {
        size: sizes,
        categoryId: category
      }
      axiosInstance.post("size", data)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            reset();
            handleClose();
            handleOpenToaster();
            fetch();
          } else {
            setErrorToast(true);
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

  const deleteSizeQuantity = () => {
    let array = sizes;
    if (array.length > 1) {
      array.splice(array.length - 1, 1);
      setSizes(array);
      setCount(--count);
    } else {
      if (count > 1) {
        setCount(--count);
      }
    }
  }

  return (
    <div>

      <Dialog open={open || editSize} onClose={handleClose}>
        <DialogTitle>Add Size</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <Grid container spacing={5} component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: "max" },
              }}
              noValidate
              autoComplete="off">
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='Size'>Category</InputLabel>
                  <Select
                    label='Category'
                    error={categoryError}
                    name="Category"
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
              {[...Array(count)].map((s, index) => (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      error={nameError}
                      name='Size'
                      type='text'
                      label='Size'
                      placeholder='Size'
                      value={s}
                      onChange={(e) => addSizes(e.target.value, index)}
                    />
                  </Grid>
                </>
              ))}

              {(count > 1) && (
                <Grid item xs={12}>
                  <AiFillDelete color="red" size="20px" style={{ cursor: "pointer" }} onClick={deleteSizeQuantity} />
                </Grid>
              )}

              <Grid item xs={6}>
                <BsFillPlusCircleFill color="#9155FD" size="20px" style={{ cursor: "pointer" }} onClick={() => setCount(++count)} />
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

export default AddOrEditSizes;
