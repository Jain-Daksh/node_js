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
  const [userDetail] = React.useState(user);

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
        <Box m="1.5rem 2.5rem">
          <br />
          <Box height="40vh">
            <Grid>
              <form>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    label="First Name"

                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={userDetail.first_name}
                  />
                  <TextField
                    label="Last Name"

                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={userDetail.last_name}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    label="Mobile"

                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={userDetail.mobile}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={userDetail.email}
                  />
                </Stack>


                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    label="Gender"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    fullWidth
                    value={userDetail.gender}
                  />
                  <TextField
                    label="Status"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    fullWidth
                    value={userDetail.status}
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