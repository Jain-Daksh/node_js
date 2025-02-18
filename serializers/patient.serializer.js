const show = async (patient) => {
  const patientData = {
    id: patient.id,
    patient_id: patient.patient_id,
    life_style: patient.life_style,
    sleep_pattern: patient.sleep_pattern,
    height: patient.height,
    weight: patient.weight,
    medical_history: patient.medical_history,
  };
  return patientData;
};

module.exports = {
  show,
};
