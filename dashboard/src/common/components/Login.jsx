import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import AuthService from "common/apis/authService";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [formErrors] = React.useState({});
  const handleSubmit = async (event) => {
    const errors = {};
    event.preventDefault()
    setEmailError(false)
    setPasswordError(false)
    if (user.email === '') {
      setEmailError(true)
    }
    if (user.password === '') {
      setPasswordError(true)
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(user.email)) {
      setEmailError(true);
      errors.email = "Invalid email address"
      return;
    }
    if (user.email && user.password) {
      try {
        await AuthService.login(user.email, user.password).then(
          () => {
            navigate("/dashboard");
          },
          (error) => {
            toast.error('incorrect email or password')
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={user.email}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          label="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={user.password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <span className="login">
          <Button fullWidth variant="outlined" className="login-button" color="secondary" type="submit">
            <span className="login-button-font">Login</span>
          </Button>
        </span>
      </form>
      <Toaster />
    </React.Fragment>
  );
}

export default LoginPage;