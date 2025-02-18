const router = require('express').Router();

const userDetails = require('../controllers/user-details.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', userDetails.create);
  router.get('/:id', verifyToken, userDetails.show);
  router.put('/:id', verifyToken, userDetails.update);
  router.delete('/:id', verifyToken, userDetails.delete);

  app.use('/api/user-details', router);
};
