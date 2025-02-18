import React, { useEffect, useState } from "react";
import Header from "common/components/Header";
import User from "common/apis/authUserLink";
import { Grid, Stack, TextField, Box } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    User.getCurrentUser().then(
      (response) => {
        console.log(response.data.user)
        setUser(response.data.user);
      },
      (error) => {
        console.log(error)
      }
    );
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="User Profile" />
      <br />
      <Box height="75vh">
        <Grid>
          <form>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                variant="outlined"
                color="secondary"
                value={user.first_name}
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                variant="outlined"
                color="secondary"
                type="text"
                value={user.last_name}
                fullWidth
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                value={user.mobile}
              />
              <TextField
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                value={user.email}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                value={user.gender}
              />
              <TextField
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                value={user.status}
              />
            </Stack>
          </form>
        </Grid>
      </Box>
    </Box>
  );
};
export default Profile;