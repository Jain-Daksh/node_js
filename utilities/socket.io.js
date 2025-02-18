/* eslint-disable camelcase */
let io;
const sockets = [];

function getConnectedUsers() {
  const activeUsers = [];
  io.on('setup', (userId, socketId) => {
    io.join(userId);
    io.emit('connected');
    if (!(activeUsers.map((u) => u.userId).includes(userId))) {
      activeUsers.push({
        user_id: userId,
        chat_id: socketId,
      });
    }
    io.emit('activeUsers', activeUsers);
  });
  return activeUsers;
}

function getAllSocketUsers() {
  const users = getConnectedUsers();
  io.emit('all_socket_users', users);
}

function sendMessage(message) {
  io.emit('new_message', message);
}
function unreadMessageCount(msg) {
  io.emit('unread_message_count', msg);
}

function init(http) {
  // eslint-disable-next-line global-require
  io = require('socket.io')(http, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  io.on('connection', (socket) => {
    const { userId } = socket.handshake.query;
    io.emit('online', {
      user_id: userId,
      is_active: true,
    });
    socket.userId = userId;
    const users = getConnectedUsers();
    io.emit('connected-users', users);


    socket.on('typing', (chat_id) => socket.in(chat_id).emit('typing'));

    sockets.push(socket);

    socket.on('disconnect', (arr) => {
      io.emit('offline', {
        user_id: userId,
      });
      const index = sockets.findIndex((s) => s.userId === userId);
      sockets.splice(index, 1);
    });
  });

  return io;
}

module.exports = {
  init,
  io,
  sendMessage,
  getAllSocketUsers,
  unreadMessageCount,
};
