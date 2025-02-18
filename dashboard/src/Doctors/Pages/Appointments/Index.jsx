import axios from "common/apis/BaseUrl";
import authHeader from 'common/apis/authHeader'
import Header from "common/components/Header";
import { React, useEffect, useState } from "react";
import {
  Button,
  Stack,
} from '@mui/material';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import Appointment from 'Doctors/apis/appointment';
import { Delete } from "@mui/icons-material";
import EditForm from "./Edit";
import View from "./View";
const PatientAppointment = () => {

  const [appointment, setAppointments] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/appointments/${id}`, {
        headers:
          { "Authorization": authHeader() }
      })
      setAppointments(appointment.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.log(error.message)
    }
  }
  const theme = useTheme();
  const columns = [
    {
      field: "fullname",
      headerName: "Patient Name",
      flex: 1,
      editable: true
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
      field: "Actions",
      flex: 2,
      renderCell: (user) => {
        return (
          <>
            <Button
              style={{ color: '#dd7973' }} onClick={() => handleDelete(user.id)}
            ><Delete />
            </Button>
            <View user={user?.row} />
            <EditForm user={user?.row} />
          </>
        );
      }
    },
  ];

  useEffect(() => {
    Appointment.getAll().then(
      (res) => {
        console.log('res.data', res.data.appointments)
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
            rows={appointment}
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

export default PatientAppointment