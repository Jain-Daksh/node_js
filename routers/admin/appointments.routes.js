const router = require('express').Router();

const appointment = require('../../controllers/admin/appointments.controller');

module.exports = (app) => {
  router.get('/', appointment.index);
  router.get('/:id', appointment.show);
  router.delete('/:id', appointment.delete);

  app.use('/api/admin/appointments', router);
};
