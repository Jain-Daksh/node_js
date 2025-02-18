const show = async (TreatmentHistory) => {
  const treatmentHistoryData = {
    id: TreatmentHistory.id,
    patient_id: TreatmentHistory.patient_id,
    doctor_id: TreatmentHistory.doctor_id,
    treatment: TreatmentHistory.treatment,
    treatment_date: TreatmentHistory.treatment_date,
  };
  return treatmentHistoryData;
};
const filter = async (treatmentHistory) => {
  const usersList = [];
  treatmentHistory.forEach((TreatmentHistory) => {
    const TreatmentHistoryData = {
      id: TreatmentHistory.id,
      treatment: TreatmentHistory.treatment,
      treatment_date: TreatmentHistory.treatment_date,
    };
    usersList.push(TreatmentHistoryData);
  });
  return usersList;
};
module.exports = {
  show, filter,
};
