import Header from "common/components/Header";
import { React, useEffect, useState } from "react";
import {
  Button,
  Stack,
} from '@mui/material';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import appointment from 'common/apis/authAppointment';
import { Delete } from "@mui/icons-material";
import authHeader from 'common/apis/authHeader'
import axios from "common/apis/BaseUrl";
import View from "./View";

const Appointment = () => {


  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/admin/appointments/${id}`, {
  //       headers:
  //         { "Authorization": authHeader() }
  //     })
  //     appointments(appointments.filter(appointments => appointments.id !== id));
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  const theme = useTheme();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`admin/appointments/${id}`, {
        headers:
          { "Authorization": authHeader() }
      })
      setAppointments(appointment.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.log(error.message)
    }
  }
  const columns = [
    {
      field: "doctor_fullname",
      headerName: "Doctor Name",
      flex: 1,
      editable: true
    },
    {
      field: "patient_fullname",
      headerName: "Patient Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "date",
      flex: 1,
    },
    {
      field: "time",
      headerName: "time",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "Actions",
      flex: 1,
      renderCell: (user) => {
        return (
          <>
            <Button
              style={{ color: '#dd7973' }} onClick={() => handleDelete(user.id)}
            ><Delete />
            </Button>
            <View user={user?.row} />
          </>
        );
      }
    },
  ];

  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    appointment.getAll().then(
      (res) => {
        console.log(res.data)
        setAppointments(res.data.appointments);
      }, (error) => {
        console.log(error)
      }
    )
  }, []);

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Header title="Appointments" subtitle="Entire list of appointments" />
        </Stack>
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={appointments}
            columns={columns}
            pageSize={10}
            components={{
              Toolbar: () => {
                return <GridToolbarContainer >
                  <GridToolbarFilterButton />
                  <GridToolbarExport />
                </GridToolbarContainer>
              }
            }}
          />
        </Box>
      </Box>
    </div>
  )
}

export default Appointment
