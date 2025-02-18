const router = require('express').Router();

const appointment = require('../controllers/appointments.controller');

module.exports = (app) => {
  router.post('/', appointment.create);
  router.get('/:id/filter', appointment.index);
  router.get('/:id', appointment.show);
  router.delete('/:id', appointment.delete);

  app.use('/api/appointments', router);
};
