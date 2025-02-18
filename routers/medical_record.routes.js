const router = require('express').Router();

const MRD = require('../controllers/medical_record_details.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', verifyToken, MRD.create);
  router.get('/:id', verifyToken, MRD.show);
  router.delete('/:id', verifyToken, MRD.delete);
  app.use('/api/patients/medical-record', router);
};
