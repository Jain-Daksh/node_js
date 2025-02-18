import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { RemoveRedEye } from '@mui/icons-material';
import { Box, Grid, Stack } from '@mui/material';

export default function View({ user }) {
  const [open, setOpen] = React.useState(false);
  const [appointmentDetail] = React.useState(user);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen} style={{ color: '#5dbea3' }}>
        <RemoveRedEye> </RemoveRedEye>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Detail</DialogTitle>
        <Box m="1.5rem 1.5rem">
          <br />
          <Box height="40vh" width="50vh">
            <Grid>
              <form>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Doctor Name"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={appointmentDetail.doctor_fullname}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Patient Name"

                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={appointmentDetail.patient_fullname}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Stack>

                <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Amount"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={appointmentDetail.amount}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Time"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={appointmentDetail.time}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    label="Date"
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={appointmentDetail.date}
                  />
                </Stack>
              </form>
            </Grid>
          </Box>
        </Box>
        <DialogActions>
          <Button style={{ color: 'yellow' }} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}