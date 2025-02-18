const show = async (user) => {
  const userData = {
    id: user.id,
    user_id: user.user_id,
    life_style: user.life_style,
    sleep_pattern: user.sleep_pattern,
    height: user.height,
    weight: user.weight,
    medical_history: user.medical_history,
  };
  return userData;
};

const index = async (User) => {
  const userDetail = {
    id: User.id,
    life_style: User.life_style,
    sleep_pattern: User.sleep_pattern,
    height: User.height,
    weight: User.weight,
    medical_history: User.medical_history,
    User: {
      fullname: User.user.first_name.concat(` ${User.user.last_name}`),
    },
  };
  return userDetail;
};
module.exports = {
  show, index,
};
