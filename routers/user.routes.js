const router = require('express').Router();

const User = require('../controllers/users.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', User.create);
  router.get('/:id', verifyToken, User.show);
  router.put('/:id', verifyToken, User.update);
  router.delete('/:id', verifyToken, User.delete);

  app.use('/api/users', router);
};
