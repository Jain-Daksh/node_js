import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";
import authHeader from 'common/apis/authHeader';
import { Edit } from '@mui/icons-material';

export default function EditForm({ appointment }) {
  const [open, setOpen] = React.useState(false);
  const [time, set_time] = React.useState(appointment.time);
  const [date, set_Date] = React.useState(appointment.date);
  const [appointmentDetail] = React.useState(appointment);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const UpdateUser = async e => {
    e.preventDefault();
    const data = {
      time: time,
      date: date,
    }
    Axios({
      method: "put",
      url: `http://localhost:5000/api/doctor/appointments/${appointment.id}`,
      data: data,
      headers: {
        'Authorization': authHeader(),
        'Content-Type': 'application/json'
      },
    })
      .then(function (response) {
        console.log(response);
        window.location = "/patients-appointment";
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ color: '#3691B0' }} data-bs-target={`#id${appointment.id}`}>
        <Edit> </Edit>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <form>
          <TextField
            margin="normal"
            fullWidth
            name="name"
            label="First Name"
            type="text"
            id="name"
            value={appointment.fullname}
          />
          <TextField
            margin="normal"
            fullWidth
            name="Date"
            label="Date"
            type="date"
            id="Date"
            value={date}
            onChange={(e) => set_Date(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="Time"
            label="Time"
            type="time"
            id="Time"
            onChange={(e) => set_time(e.target.value)}
            value={time}
          />
        </form>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'red' }}>Cancel</Button>
          <Button onClick={e => UpdateUser(e)} style={{ color: 'green' }}>Save</Button>
        </DialogActions>
      </Dialog>

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
    </div >
  );
}