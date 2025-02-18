const router = require('express').Router();

const payment = require('../controllers/payments.controller');

module.exports = (app) => {
  router.post('/', payment.create);
  router.post('/payment', payment.paymentCreate);

  router.post('/verification', payment.paymentVerification);
  app.use('/api/payment', router);
};
