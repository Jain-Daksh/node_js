const show = async (review) => {
  const reviewData = {
    id: review.id,
    patient_id: review.patient_id,
    doctor_id: review.doctor_id,
    review: review.review,
    feedback: review.feedback,
  };
  return reviewData;
};

module.exports = {
  show,
};
