const db = require('../../models/index');

const { User, Appointment } = db;
const doctors = User.scope('doctor');
const patients = User.scope('patient');

exports.index = async (req, res, next) => {
  try {
    const count = await User.count({ where: { is_admin: false } });
    const doctorcount = await doctors.count();
    const patientcount = await patients.count();
    const admincount = await User.count({
      where: {
        is_admin: true,
      },
    });
    res.status(200).send({
      total_users: count,
      total_doctors: doctorcount,
      total_patients: patientcount,
      total_admins: admincount,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
    next();
  }
};

exports.show = async (req, res, next) => {
  try {
    const count = await Appointment.count();
    res.status(200).send({
      total_appoitment: count,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
    next();
  }
};
