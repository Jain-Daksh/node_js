import React from 'react'
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import LoginForm from 'common/components/Login'

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const LoginPage = () => {

  return (
    <>
      <title> Login </title>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
              Login
            </Typography>
            <br />
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default LoginPage;