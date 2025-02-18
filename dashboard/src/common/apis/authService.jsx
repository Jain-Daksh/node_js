import axios from "./BaseUrl";

var now = new Date().getTime();

const login = async (email, password) => {
  return axios.post('login', {
    email,
    password,
  }).then((response) => {
    console.log(response.data.user)
    localStorage.setItem('userdetails', JSON.stringify(response.data.user))
    localStorage.setItem('setupTime', now);
    localStorage.setItem("id", response.data.user.id);
    localStorage.setItem("admin", response.data.user.is_admin);
    localStorage.setItem("doctor", response.data.user.is_doctor);
    localStorage.setItem("authtoken", response.data.token);
    localStorage.setItem("name", response.data.user.first_name);
    localStorage.setItem("role", response.data.user.role);

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("authtoken");
  localStorage.removeItem("name");
  localStorage.removeItem("admin");
  localStorage.removeItem("doctor");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("authtoken"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;