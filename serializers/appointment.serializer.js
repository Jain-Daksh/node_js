const show = async (appointment) => {
  const appointmentData = {
    id: appointment.id,
    date: appointment.date,
    time: appointment.time,
    payment_id: appointment.patient_id,
    amount: appointment.payment.amount,

    doctor_fullname: appointment.doctor.first_name.concat(` ${appointment.doctor.last_name}`),
    patient_fullname: appointment.patient.first_name.concat(` ${appointment.patient.last_name}`),
  };
  return appointmentData;
};

const index = async (appointmentRecord) => {
  const appointmentRecordList = [];

  appointmentRecord.forEach((appointment) => {
    const list = {
      id: appointment.id,
      date: appointment.date,
      time: appointment.time,
      doctor_fullname: appointment.doctor.first_name.concat(` ${appointment.doctor.last_name}`),
      patient_fullname: appointment.patient.first_name.concat(` ${appointment.patient.last_name}`),
      amount: appointment.payment.amount,
    };
    appointmentRecordList.push(list);
  });
  return appointmentRecordList;
};

const showDoctors = async (appointmentRecord) => {
  const appointmentRecordList = [];

  appointmentRecord.forEach((appointment) => {
    const list = {
      id: appointment.id,
      date: appointment.date,
      time: appointment.time,
      amount: appointment.payment.amount,
      fullname: appointment.doctor.first_name.concat(` ${appointment.doctor.last_name}`),
    };
    appointmentRecordList.push(list);
  });
  return appointmentRecordList;
};

const showPatients = async (appointmentRecord) => {
  const appointmentRecordList = [];

  appointmentRecord.forEach((appointment) => {
    const list = {
      id: appointment.id,
      date: appointment.date,
      time: appointment.time,
      amount: appointment.payment.amount,
      fullname: appointment.patient.first_name.concat(` ${appointment.patient.last_name}`),
    };
    appointmentRecordList.push(list);
  });
  return appointmentRecordList;
};


module.exports = {
  show, index, showDoctors, showPatients,
};
