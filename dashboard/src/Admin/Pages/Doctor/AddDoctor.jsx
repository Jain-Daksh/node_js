import React, { useState } from "react";
import Header from "common/components/Header";
import User from "common/apis/authUserLink";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Stack, TextField, RadioGroup, FormControlLabel, Radio, Box, FormLabel } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState([]);
  const [formErrors, setFormErrors] = React.useState({});

  const validateForm = () => {
    const errors = {};
    if (!body.first_name.trim()) {
      errors.first_name = "First name is required";
    } else if (/\d/.test(body.first_name)) {
      errors.first_name = "First name should not contain numbers";
    }
    if (!body.last_name.trim()) {
      errors.last_name = "Last name is required";
    } else if (/\d/.test(body.last_name)) {
      errors.last_name = "Last name should not contain numbers";
    }
    if (!body.mobile.trim()) {
      errors.mobile = "Phone number is required";
    } else if (!/^\d+$/.test(body.mobile)) {
      errors.mobile = "Invalid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const body = {
    email: doctorData.email,
    password: doctorData.password,
    first_name: doctorData.first_name,
    last_name: doctorData.last_name,
    gender: doctorData.gender,
    mobile: doctorData.mobile,
    is_doctor: true,
    date_of_birth: doctorData.date_of_birth
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      User.addUser(body)
        .then(res => {
          console.log(res)
          navigate('/doctors')
        })
        .catch(err => {
          toast.error(err.message);
          console.log(err);
        })
    }
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Doctors" subtitle="" />
      <br />
      <Box height="75vh">
        <Grid>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="First Name"
                onChange={(e) => setDoctorData({ ...doctorData, first_name: e.target.value })}
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 3 }}
                fullWidth
                error={!!formErrors.first_name}
                helperText={formErrors.first_name}
                value={doctorData.first_name}
              />
              <TextField
                label="Last Name"
                onChange={(e) => setDoctorData({ ...doctorData, last_name: e.target.value })}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={doctorData.last_name}
                error={!!formErrors.last_name}
                helperText={formErrors.last_name}
                fullWidth
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="Email"
                onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                required
                variant="outlined"
                color="secondary"
                type="email"
                sx={{ mb: 3 }}
                fullWidth
                error={!!formErrors.email}
                helperText={formErrors.email}
                value={doctorData.email}
              />
              <TextField
                label="Password"
                onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
                required
                variant="outlined"
                color="secondary"
                type="password"
                error={!!formErrors.password}
                helperText={formErrors.password}
                value={doctorData.password}
                fullWidth
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="Mobile"
                onChange={(e) => setDoctorData({ ...doctorData, mobile: e.target.value })}
                required
                variant="outlined"
                color="secondary"
                type="number"
                sx={{ mb: 3 }}
                fullWidth
                value={doctorData.mobile}
                error={!!formErrors.mobile}
                helperText={formErrors.mobile}
              />
              <TextField
                label="Date of birth"
                onChange={(e) => setDoctorData({ ...doctorData, date_of_birth: e.target.value })}
                required
                variant="outlined"
                color="secondary"
                type="date"
                sx={{ mb: 3 }}
                fullWidth
                value={doctorData.date_of_birth}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <FormLabel id="demo-radio-buttons-group-label" sx={{ mt: 1 }} s>Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                required
                value={doctorData.gender}
                onChange={(e) => setDoctorData({ ...doctorData, gender: e.target.value })}
              >
                <div>
                  <FormControlLabel value="Female" control={<Radio />} label="female" />
                  <FormControlLabel value="Male" control={<Radio />} label="male" />
                </div>
              </RadioGroup>
            </Stack>
            <spam justifyContent="space-between" style={{ float: 'right' }}>

              <Button justifyContent="space-between"
                alignItems="center" variant="outlined" color="secondary" type="submit">Add Doctor
              </Button>
            </spam>
          </form>
        </Grid>
      </Box>
      <Toaster />

    </Box>
  );
};

export default AddDoctor;