
const show = async (msg) => {
  const details = {
    id: msg.id,
    sender_id: msg.sender_id,
    receiver_id: msg.receiver_id,
    content: msg.content,
    chat_id: msg.chat_id,
  };
  return details;
};

module.exports = {
  show,
};
