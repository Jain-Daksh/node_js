const router = require('express').Router();

const users = require('../../controllers/admin/count.controller');

module.exports = (app) => {
  router.get('/total-users', users.index);
  router.get('/total-appointments', users.show);
  app.use('/api/admin/counts', router);
};
