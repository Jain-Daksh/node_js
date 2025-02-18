require('dotenv').config();
require('dotenv').config({ path: './.env.development' });
require('dotenv').config({ path: './.env.test' });
require('dotenv').config({ path: './.env.production' });
const express = require('express');

const cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

const PORT = process.env.SERVER_PORT || 3011;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const http = require('http').Server(app);

const { router } = require('./routers/index');
const { init } = require('./utilities/socket.io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

init(http);

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});
