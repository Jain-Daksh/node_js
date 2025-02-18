import PrivateRoute from 'common/apis/PrivatePage';
import Benefits from 'common/Pages/Benefits';
import Home from 'common/Pages/Home';
import Profile from 'common/Pages/Profile';
import { useRoutes } from 'react-router-dom';
import DoctorAppointment from "Doctors/Pages/Appointments/Index";

export default function PatientRouter() {
  const routes = [
    {
      path: "doctors-appointments",
      element: (
        <PrivateRoute>
          <DoctorAppointment />
        </PrivateRoute>
      )
    },
    {
      path: "/profile",
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      )
    },
    {
      path: "/benefits",
      element: (
        <PrivateRoute>
          <Benefits />
        </PrivateRoute>
      )
    },
    {
      path: "faq",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      )
    }
  ]
  return routes;
}