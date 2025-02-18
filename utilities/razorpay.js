const crypto = require('crypto');
const db = require('../models');

const { Payment } = db;
const { httpStatusCodes } = require('./Errors/BaseError');

const verification = async (req, res) => {
  const body = `${req.body.razorpay_order_id}|${req.body.razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === req.body.razorpay_signature;

  if (isAuthentic) {
    await Payment.create(req.body);

    res.send({ code: httpStatusCodes.OK, message: 'payment added' });
  } else {
    res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
    });
  }
};

module.exports = {
  verification,
};
