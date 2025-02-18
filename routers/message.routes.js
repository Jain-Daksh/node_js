const router = require('express').Router();
const Message = require('../controllers/messages.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', verifyToken, Message.create);
  router.get('/:id', verifyToken, Message.index);
  router.get('/:id', verifyToken, Message.show);
  app.use('/api/messages', router);
};
