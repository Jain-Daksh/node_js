const router = require('express').Router();

const TH = require('../controllers/treatment_histories.controller');

module.exports = (app) => {
  router.post('/', TH.create);
  router.get('/:id', TH.show);
  router.put('/:id', TH.update);
  router.delete('/:id', TH.delete);
  router.get('/:id/filter', TH.index);

  app.use('/api/treatment-history', router);
};
