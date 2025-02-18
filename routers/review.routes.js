const router = require('express').Router();

const review = require('../controllers/reviews.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', verifyToken, review.create);
  router.get('/:id', verifyToken, review.show);
  router.put('/:id', verifyToken, review.update);
  router.delete('/:id', verifyToken, review.delete);
  app.use('/api/reviews', router);
};
