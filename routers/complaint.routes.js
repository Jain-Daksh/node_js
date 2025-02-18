const router = require('express').Router();

const complaint = require('../controllers/complaints.controller');
const verifyToken = require('../auth/auth');

module.exports = (app) => {
  router.post('/', complaint.create);
  router.get('/:id', complaint.show);
  router.put('/:id', verifyToken, complaint.update);
  router.delete('/:id', verifyToken, complaint.delete);
  app.use('/api/complaints', router);
};
