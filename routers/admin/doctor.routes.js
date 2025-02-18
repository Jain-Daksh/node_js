const router = require('express').Router();

const doctor = require('../../controllers/admin/doctors.controller');
const verifyToken = require('../../auth/auth');

module.exports = (app) => {
  router.post('/', verifyToken, verifyToken, doctor.create);
  router.get('/', verifyToken, doctor.index);
  router.get('/:id', verifyToken, doctor.show);
  router.put('/:id', verifyToken, doctor.update);
  router.delete('/:id', verifyToken, doctor.delete);
  app.use('/api/admin/doctors', router);
};

