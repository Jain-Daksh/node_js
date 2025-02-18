const Razorpay = require('razorpay');
const { verification } = require('../utilities/razorpay');
const db = require('../models/index');
const serialize = require('../serializers/appointment.serializer');

const { Api422Error } = require('../utilities/Errors/errorHandler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { Payment } = db;

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

exports.create = async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
  };
  instance.orders.create(options, (err, payment) => {
    if (err) {
      res.send({ code: httpStatusCodes.INTERNAL_SERVER, message: 'Server Err.' });
    } else {
      res.status(httpStatusCodes.OK).send({
        payment_detail: payment,
      });
    }
  });
};

exports.paymentVerification = async (req, res, next) => {
  try {
    const requestPaymentVerification = await verification(req, res, next);
    res.json(requestPaymentVerification);
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.paymentCreate = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    // const responseData = await serialize.show(payment);
    res.status(201).send({
      payment: payment,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
