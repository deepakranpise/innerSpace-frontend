import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';


const DeleteModal = ({ deleteItem, handleClose, deleteProduct, type }) => {



  return (
    <>
      <Dialog open={deleteItem != undefined} onClose={handleClose}>
        <DialogTitle>Delete {type}</DialogTitle>
        <DialogContent>
          <form onSubmit={deleteProduct} style={{ marginTop: "10px" }}>
            <Grid container spacing={5} component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: "max" },
              }}
              noValidate
              autoComplete="off">

              <DialogTitle> Are you sure want to delete {deleteItem?.name} ?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">

                </DialogContentText>
              </DialogContent>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"
            onClick={deleteProduct}
          >Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModal;
