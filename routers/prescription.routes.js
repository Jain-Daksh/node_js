const router = require('express').Router();

const prescription = require('../controllers/prescriptions.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', verifyToken, prescription.create);
  router.get('/:id', verifyToken, prescription.show);
  router.put('/:id', verifyToken, prescription.update);
  router.delete('/:id', verifyToken, prescription.delete);
  app.use('/api/prescriptions', router);
};
