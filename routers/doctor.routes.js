const router = require('express').Router();

const doctor = require('../controllers/doctors.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', doctor.create);
  router.get('/:id', doctor.show);
  router.put('/:id', verifyToken, doctor.update);
  router.delete('/:id', verifyToken, doctor.delete);
  app.use('/api/doctors', router);
};
