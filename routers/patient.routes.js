const router = require('express').Router();

const patient = require('../controllers/patients.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', patient.create);
  router.get('/:id', verifyToken, patient.show);
  router.put('/:id', verifyToken, patient.update);
  router.delete('/:id', verifyToken, patient.delete);
  app.use('/api/patients', router);
};
