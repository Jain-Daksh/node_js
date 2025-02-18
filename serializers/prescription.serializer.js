const show = async (prescription) => {
  const prescriptionData = {
    id: prescription.id,
    patient_id: prescription.patient_id,
    doctor_id: prescription.doctor_id,
    treatment: prescription.treatment,
    recommendation: prescription.recommendation,
  };
  return prescriptionData;
};

const index = async (patient) => {
  const patientsList = [];

  patient.forEach((prescription) => {
    const user = {
      id: prescription.id,
      patient_id: prescription.patient_id,
      doctor_id: prescription.doctor_id,
      treatment: prescription.treatment,
      recommendation: prescription.recommendation,
    };
    patientsList.push(user);
  });
  return patientsList;
};

module.exports = {
  show, index,
};
