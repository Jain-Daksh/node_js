const db = require('../models/index');
const serialize = require('../serializers/review.serializer');

const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { Review } = db;

exports.show = async (req, res) => {
  try {
    const review = await Review.findOne({ where: { patient_id: req.params.id } });
    const responseData = await serialize.show(review);
    res.status(200).send({
      review: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Review  with id: ${req.params.id} not found.`),
    });
  }
};
exports.create = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    const responseData = await serialize.show(review);
    res.status(201).send({
      review: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const review = await Review.findOne({ where: { patient_id: req.params.id } });
    if (review) {
      review.update(req.body);
      const responseData = await serialize.show(review);
      res.status(202).send({
        review: responseData,
        message: 'Review updated',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Review  with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const review = await Review.findOne({ where: { patient_id: req.params.id } });
    if (review) {
      Review.destroy({
        where: { patient_id: req.params.id },
      });
      res.send({
        message: 'Review deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Review  with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
