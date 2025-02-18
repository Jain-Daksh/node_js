import React from "react";
import { role } from "common/components/UserRole";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {

  ChevronLeft,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    link: "dashboard"

  },
  {
    text: "Doctors",
    icon: <Groups2Outlined />,
    link: "doctors"
  },
  {
    text: "Patients",
    icon: <Groups2Outlined />,
    link: "patients"

  },
  {
    text: "Appointments",
    icon: <ReceiptLongOutlined />,
    link: "appointments"

  },
  {
    text: "Benefits",
    icon: <ReceiptLongOutlined />,
    link: "benefits"

  },
  {
    text: "FAQ",
    icon: <HomeOutlined />,
    link: "faq"

  },
];
const patientItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    link: "dashboard"

  },
  {
    text: "Appointments",
    icon: <ReceiptLongOutlined />,
    link: "appointments"

  },
  {
    text: "Benefits",
    icon: <ReceiptLongOutlined />,
    link: "benefits"

  },
  {
    text: "FAQ",
    icon: <HomeOutlined />,
    link: "faq"

  },
]
const doctorItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    link: "dashboard"

  },
  {
    text: "Appointments",
    icon: <ReceiptLongOutlined />,
    link: "appointments"

  },
  {
    text: "Benefits",
    icon: <ReceiptLongOutlined />,
    link: "benefits"

  },
  {
    text: "FAQ",
    icon: <HomeOutlined />,
    link: "faq"

  },
]
const sidebardesign = role === 'admin' ? navItems : (role === 'doctor' ? doctorItems : patientItems);
console.log('role', role)
console.log('sidebardesign', sidebardesign)
const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Dashboard
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {sidebardesign.map(({ text, icon, link }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${link}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;