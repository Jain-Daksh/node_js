const userName = localStorage.getItem("name");
const userInfo = localStorage.getItem("user")
const userID = localStorage.getItem("id")
const admin = localStorage.getItem("is_admin")
const doctor = localStorage.getItem("is_doctor")
const role = localStorage.getItem("role")

module.exports = {
  userName, doctor, admin, userInfo, userID, role, 
}