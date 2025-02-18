const show = async (user) => {
  const userrData = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    image: user.image,
    status: user.current_status,
    role: user.role,
  };
  return userrData;
};

const index = async (users) => {
  const userArray = [];
  users.forEach((user) => {
    const userData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile: user.mobile,
      gender: user.gender,
      image: user.image,
      status: user.current_status,
      role: user.role,

    };
    userArray.push(userData);
  });
  return userArray;
};

const showDoctor = async (user) => {
  const userData = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    status: user.current_status,
    doctor: {
      experience: user.Doctors.experience,
      specialization: user.Doctors.specialization,
      start_time: user.Doctors.start_time,
      end_time: user.Doctors.end_time,
      fees: user.Doctors.fees,
    },
  };
  return userData;
};

const showPatient = async (user) => {
  const userrData = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    status: user.current_status,
    patient: {
      life_style: user.userDetail.life_style,
      sleep_pattern: user.userDetail.sleep_pattern,
      height: user.userDetail.height,
      weight: user.userDetail.weight,
    },
  };
  return userrData;
};

module.exports = {
  show, index, showDoctor, showPatient,
};
