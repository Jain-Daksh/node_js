import React from "react";
import { useEffect, useState } from 'react';
import User from "common/apis/authUserLink";
import FlexBetween from "common/components/FlexBetween";
import Header from "common/components/Header";
import {
  Groups,
  People,
} from "@mui/icons-material";
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StatBox from "common/components/StatBox";
import Pie from "common/components/Pie";
import { Barchart } from "common/components/BarChart";
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [user, setUser] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);
  const [appointment, setAppointments] = useState([]);

  useEffect(() => {
    User.getAllUSer().then(
      (response) => {
        console.log(response)
        setUser(response.data.total_users);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    User.getAllAppointment().then(
      (response) => {
        setAppointments(response.data.total_appoitment);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);
  useEffect(() => {
    User.getAllUSer().then(
      (response) => {
        console.log(response)
        setDoctors(response.data.total_doctors);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    User.getAllUSer().then(
      (response) => {
        console.log(response)
        setPatient(response.data.total_patients);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total User"
          value={user}
          icon={
            <Groups
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Patient"
          value={patient}
          icon={
            <People
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Doctor"
          value={doctors}
          icon={
            <People
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Appointments"
          value={appointment}
          icon={
            <People
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          borderRadius="0.55rem"
        >
          <Barchart />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          borderRadius="0.55rem"
        >
          <Pie />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard