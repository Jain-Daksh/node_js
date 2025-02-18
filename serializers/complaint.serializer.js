const show = async (compalint) => {
  const complaintData = {
    id: compalint.id,
    user_id: compalint.user_id,
    complaint: compalint.complaint,
  };
  return complaintData;
};

module.exports = {
  show,
};
