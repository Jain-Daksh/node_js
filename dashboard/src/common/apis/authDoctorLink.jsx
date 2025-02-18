import axios from "./BaseUrl";
import authHeader from "./authHeader";

const getAll = () => {
  return axios.get("admin/doctors", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};

const getDoctor = ({ doctors }) => {
  return axios.get(`/${doctors.id}`,
    { headers: authHeader() }
  )
};

const deleteDoctor = ({ doctor }) => {
  console.log(doctor)
  return axios.delete(`admin/doctors/${doctor.id}`,
    { headers: authHeader() }
  )
};

const addUser = (body) => {
  return axios.post('users', body, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader(),
    },
  });
};

const authDoctorLink = {
  getAll, addUser, getDoctor, deleteDoctor
};

export default authDoctorLink;