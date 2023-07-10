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
  const [nameError, setNameError] = useState(false);

  React.useEffect(() => {
    console.log("editCategory ", editCategory)
    if (editCategory) {
      setName(editCategory.name);
    } else {
      setName('');
    }

  }, [editCategory])

  const handleSubmit = () => {
    if (!name) {
      setNameError(true);

      return;
    }
    setNameError(false);

    try {
      const data = {
        name: name
      }

      if (editCategory) {
        data.id = editCategory._id
      }
      (open ? axiosInstance.post("Category", data) : axiosInstance.put("Category/update", data))
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
    setName("")
  }

  return (
    <div>

      <Dialog open={open || editCategory} onClose={handleClose}>
        <DialogTitle>{open ? 'Add' : editCategory && 'Update'} Category</DialogTitle>
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
                  name='CategoryName'
                  type='text'
                  label='Category Name'
                  placeholder='Category name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"
            onClick={handleSubmit}
          >{open ? 'Add' : editCategory && 'Update'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddOrEditCategory;
