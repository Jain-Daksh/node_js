import axios from "common/apis/BaseUrl";
import authHeader from "common/apis//authHeader";
import { userID } from "common/components/UserRole"

const getAll = () => {
  return axios.get(`/doctor/appointments/${userID}/filter`, {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};

const getAppointment = ({ appointments }) => {
  return axios.get(`/doctor/${appointments.id}`,
    { headers: authHeader() }
  )
};

const deleteAppointment = ({ appointment }) => {
  return axios.delete(`/doctor/appointments/${appointment.id}`,
    { headers: authHeader() }
  )
};

const addUser = (body) => {
  return axios.post('/doctor/appointments', body, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader(),
    },
  });
};

const authAppointmentLink = {
  getAll, addUser, getAppointment, deleteAppointment
};

export default authAppointmentLink;