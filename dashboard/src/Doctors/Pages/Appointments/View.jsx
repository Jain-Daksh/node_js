import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { RemoveRedEye } from '@mui/icons-material';

export default function View({ appointment }) {
  const [open, setOpen] = React.useState(false);
  const [appointmentDetail, setAppointmentDetails] = React.useState(appointment);

  console.log(appointment)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button  onClick={handleClickOpen} style={{ color: '#90EE90' }}>
        <RemoveRedEye> </RemoveRedEye>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Appointment</DialogTitle>
        <form>
          <TextField
            margin="normal"
            fullWidth
            name="Name"
            label="Name"
            value={appointmentDetail.fullname}
          />
          <TextField
            margin="normal"
            fullWidth
            name="Time"
            label="Time"
            value={appointmentDetail.time}
          />
          <TextField
            margin="normal"
            fullWidth
            name="Date"
            label="Date"
            value={appointmentDetail.date}
          />
        </form>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}