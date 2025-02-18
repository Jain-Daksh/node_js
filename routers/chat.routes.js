const router = require('express').Router();
const chat = require('../controllers/chats.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', verifyToken, chat.create);
  router.get('/:id', verifyToken, chat.show);
  app.use('/api/chats', router);
};
