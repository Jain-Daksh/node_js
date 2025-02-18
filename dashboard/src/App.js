import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import LoginPage from "common/Pages/LoginPage";
import Dashboard from "Admin/Pages/Dashboard";
import Layout from "common/Pages/Layout";
import Doctor from "Admin/Pages/Doctor";
import PrivateRoute from "common/apis/PrivatePage";
import AddDoctor from "Admin/Pages/Doctor/AddDoctor";
import { role } from "common/components/UserRole";
import Home from "common/Pages/Home";
import Benefits from "common/Pages/Benefits";
import Patient from "Admin/Pages/Patients";
import AddPatient from "Admin/Pages/Patients/AddPatient";
import Appointment from "Admin/Pages/Appointment";
import Profile from "common/Pages/Profile";
import DoctorAppointment from "Doctors/Pages/Appointments/Index";
import DoctorDetails from "Admin/Pages/Doctor/DoctorDetails";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>

            <Route path="/" element=
              {<Navigate to="/dashboard" replace />} />
            <Route path="/faq" element=
              {
                <PrivateRoute >
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/dashboard" element=
              {
                <PrivateRoute >
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/doctors" element={
              <PrivateRoute >
                <Doctor />
              </PrivateRoute>}
            />
            <Route path="/patients" element={
              <PrivateRoute >
                <Patient />
              </PrivateRoute>}
            />
            <Route path="/add" element={
              <PrivateRoute >
                <AddDoctor />
              </PrivateRoute>}
            />
            <Route path="/add-patient" element={
              <PrivateRoute >
                <AddPatient />
              </PrivateRoute>}
            />
            <Route path="/appointments" element={
              <PrivateRoute >
                <Appointment />
              </PrivateRoute>}
            />
            <Route path="benefits" element={
              <PrivateRoute>
                <Benefits />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute >
                <Profile />
              </PrivateRoute>}
            />
            <Route path="/doctor-appointments" element={
              <PrivateRoute >
                <DoctorAppointment />
              </PrivateRoute>}
            />
            <Route path="/doctor-details" element={
              <DoctorDetails />

            } />
            <Route path="/patient-appointments" element={
              <PrivateRoute >
                {/* <PatientAppointment /> */}
              </PrivateRoute>}
            />
          </Route >
        </Routes>
      </ThemeProvider>
    </div >
  );
}

export default App;