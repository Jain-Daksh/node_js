const show = async (doctor) => {
  const doctorData = {
    id: doctor.id,
    doctor_id: doctor.doctor_id,
    experience: doctor.experience,
    specialization: doctor.specialization,
    start_time: doctor.start_time,
    end_time: doctor.end_time,
    fees: doctor.fees,
  };
  return doctorData;
};

module.exports = {
  show,
};
