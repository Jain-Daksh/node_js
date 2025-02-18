import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SupervisedUserCircle,
} from "@mui/icons-material";
import FlexBetween from "common/components/FlexBetween";
import { useDispatch } from "react-redux";
import { userName } from 'common/components/UserRole'
import { setMode } from "state";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const logout = () => {
    navigate('/login')
    localStorage.removeItem("authtoken");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    localStorage.removeItem("doctor");
    localStorage.removeItem("role");

  };
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const profile = () => {
    navigate("profile");
  }
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <FlexBetween>
            <h2>{userName}</h2>
          </FlexBetween>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <SupervisedUserCircle sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={logout}>Log Out</MenuItem>
              <MenuItem onClick={profile}>Profile</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;