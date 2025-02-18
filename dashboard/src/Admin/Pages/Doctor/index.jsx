import Header from "common/components/Header";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import {
  Stack,
  Button,
} from '@mui/material';
import { Box, useTheme } from "@mui/material";
import authHeader from 'common/apis/authHeader'
import axios from "common/apis/BaseUrl";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import Doctors from 'common/apis/authDoctorLink';
import View from "common/components/View";

import EditForm from "./EditPage";
import { Delete } from "@mui/icons-material";
const Doctor = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const AddUserClick = () => {
    navigate("/add");
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`admin/doctors/${id}`, {
        headers:
          { "Authorization": authHeader() }
      })
      setDoctor(doctor.filter(doctor => doctor.id !== id));
    } catch (error) {
      console.log(error.message)
    }
  }

  console.log()
  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      editable: true
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
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

  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    Doctors.getAll().then(
      (response) => {
        setDoctor(response.data.doctors);
      },
      (error) => {
        console.log(error)
      }
    );
  }, []);
  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Header title="Doctors" subtitle="Entire list of doctors" />
          <Button variant="contained" onClick={AddUserClick}
          >
            New Doctor
          </Button>
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
            rows={doctor}
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

export default Doctor
