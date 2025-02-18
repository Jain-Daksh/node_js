const router = require('express').Router();

const patient = require('../../controllers/admin/patients.controller');
const verifyToken = require('../../auth/auth');

module.exports = (app) => {
  router.get('/', verifyToken, patient.index);
  router.get('/:id', verifyToken, patient.show);
  router.post('/', verifyToken, patient.create);
  router.put('/:id', verifyToken, patient.update);
  router.delete('/:id', verifyToken, patient.delete);

  app.use('/api/admin/patients', router);
};

