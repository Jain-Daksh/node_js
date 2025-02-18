import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";
import authHeader from 'common/apis/authHeader';
import { Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

export default function EditForm({ user }) {
  const [open, setOpen] = React.useState(false);
  const [first_name, set_first_name] = React.useState(user.first_name);
  const [last_name, set_last_name] = React.useState(user.last_name);
  const [mobile, set_mobile] = React.useState(user.mobile);
  const [gender, set_gender] = React.useState(user.gender);
  const [current_status, set_status] = React.useState(user.status);
  const [formErrors, setFormErrors] = React.useState({});


  const validateForm = () => {
    const errors = {};
    // Validate first name
    if (!first_name.trim()) {
      errors.first_name = "First name is required";
    } else if (/\d/.test(first_name)) {
      errors.first_name = "First name should not contain numbers";
    }
    // Validate last name
    if (!last_name.trim()) {
      errors.last_name = "Last name is required";
    } else if (/\d/.test(last_name)) {
      errors.last_name = "Last name should not contain numbers";
    }
    // Validate phone number
    if (!mobile.trim()) {
      errors.mobile = "Phone number is required";
    } else if (!/^\d+$/.test(mobile)) {
      errors.mobile = "Invalid phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const UpdateUser = async e => {
    e.preventDefault();
    const data = {
      first_name: first_name,
      last_name: last_name,
      phone: mobile,
      gender: gender,
      current_status: current_status
    }
    if (validateForm()) {
      Axios({
        method: "put",
        url: `http://localhost:5000/api/admin/patients/${user.id}`,
        data: data,
        headers: {
          'Authorization': authHeader(),
          'Content-Type': 'application/json'
        },
      })
        .then(function (response) {
          console.log(response);
          window.location = "/patients";
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ color: '#4681f4' }} data-bs-target={`#id${user.id}`}>
        <Edit />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <Box m="1.5rem 2.5rem">
          <br />
          <Box height="40vh">
            <Grid>
              <form>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    label="First Name"
                    onChange={(e) => set_first_name(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={first_name}
                    error={!!formErrors.first_name}
                    helperText={formErrors.first_name}

                  />
                  <TextField
                    label="Last Name"
                    onChange={(e) => set_last_name(e.target.value)}
                    error={!!formErrors.last_name}
                    helperText={formErrors.last_name}

                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={last_name}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    label="Mobile"
                    onChange={(e) => set_mobile(e.target.value)}
                    error={!!formErrors.mobile}
                    helperText={formErrors.mobile}
                    variant="outlined"
                    color="secondary"
                    type="number"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={mobile}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <FormLabel id="demo-radio-buttons-group-label" sx={{ mt: 1 }} s>Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"

                    value={gender}
                    onChange={(e) => set_gender(e.target.value)}
                  >
                    <div>
                      <FormControlLabel value="Female" control={<Radio />} label="female" />
                      <FormControlLabel value="Male" control={<Radio />} label="male" />
                    </div>
                  </RadioGroup>
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                  <FormLabel id="demo-radio-buttons-group-label" sx={{ mt: 1 }} s>Status</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"

                    value={current_status}
                    onChange={(e) => set_status(e.target.value)}
                  >
                    <div>
                      <FormControlLabel value="approved" control={<Radio />} label="approved" />
                      <FormControlLabel value="pending" control={<Radio />} label="pending" />
                    </div>
                  </RadioGroup>
                </Stack>
              </form>
            </Grid>
          </Box>
        </Box>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'red' }}>Cancel</Button>
          <Button onClick={e => UpdateUser(e)} style={{ color: 'yellow' }}>Save</Button>
        </DialogActions>
      </Dialog>
      <Toaster />

    </div >
  );
}