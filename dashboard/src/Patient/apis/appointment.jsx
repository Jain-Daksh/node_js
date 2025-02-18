import axios from "common/apis/BaseUrl";
import authHeader from "common/apis//authHeader";
import { userID } from "common/components/UserRole"

const getAll = () => {
  return axios.get(`/appointments/${userID}/filter`, {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};

const getAppointment = ({ appointments }) => {
  return axios.get(`/${appointments.id}`,
    { headers: authHeader() }
  )
};

const deleteAppointment = ({ appointment }) => {
  return axios.delete(`/appointments/${appointment.id}`,
    { headers: authHeader() }
  )
};

const addUser = (body) => {
  return axios.post('appointments', body, {
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