import axios from "./BaseUrl";
import authHeader from "./authHeader";
import { userID } from "common/components/UserRole"

const addUser = (body) => {
  return axios.post('users', body, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader(),
    },
  });
};
const deleteUser = ({ user }) => {
  return axios.delete(`admin/users/${user.id}`,
    { headers: authHeader() }
  )
};
const getLast10Users = () => {
  return axios.get(`admin/users`, {
    headers: {
      "Authorization": authHeader()
    },
  }
  )
};
const getAllUSer = () => {
  return axios.get("admin/counts/total-users", {
    headers: {
      "Authorization": authHeader()
    },
  }
  );
};

const getAllAppointment = () => {
  return axios.get("admin/counts/total-appointments", {
    headers: {
      "Authorization": authHeader()
    },
  }
  );
};
const getCurrentUser = () => {
  return axios.get(`users/${userID}`, {
    headers: {
      "Authorization": authHeader()
    },
  })
}

const authUserLink = {
  addUser, getAllUSer, deleteUser, getLast10Users, getAllAppointment, getCurrentUser
};

export default authUserLink;