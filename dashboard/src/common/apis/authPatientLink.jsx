import axios from "./BaseUrl";
import authHeader from "./authHeader";

const getAll = () => {
  return axios.get("admin/patients", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};

const getPatient = ({ patient }) => {
  return axios.get(`admin/${patient.id}`,
    { headers: authHeader() }
  )
};

const DeletePatient = ({ id }) => {
  return axios.delete(`admin/patients/${id.id}`,
    { headers: authHeader() }
  )
};
const addUser = () => {
  return axios.post('users', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader(),
    },
  });
};

const authPatientLink = {
  addUser, getPatient, getAll, DeletePatient
};

export default authPatientLink;