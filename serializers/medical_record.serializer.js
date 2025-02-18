const show = async (MedicalRecord) => {
  const medicalRecordData = {
    id: MedicalRecord.id,
    patient_id: MedicalRecord.patient_id,
    image: MedicalRecord.image,
  };
  return medicalRecordData;
};
const index = async (MedicalRecord) => {
  const medicalRecordList = [];

  MedicalRecord.forEach((u) => {
    const record = {
      id: u.id,
      patient_id: u.patient_id,
      image: u.image,
    };
    medicalRecordList.push(record);
  });
  return medicalRecordList;
};
module.exports = {
  show, index,
};
