const db = require('../models/index');
const serialize = require('../serializers/doctor.serializer');

const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { Doctor } = db;

exports.show = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { user_id: req.params.id } });
    if (doctor) {
      const responseData = await serialize.show(doctor);
      res.status(202).send({
        doctor: responseData,
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Doctor detail with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    const responseData = await serialize.show(doctor);
    res.status(201).send({
      doctor: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { user_id: req.params.id } });
    if (doctor) {
      doctor.update(req.body);
      const responseData = await serialize.show(doctor);
      res.status(202).send({
        doctor_detail: responseData,
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Doctor detail with id: ${req.params.id} not found.`),
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
    const doctor = await Doctor.findOne({ where: { user_id: req.params.id } });
    if (doctor) {
      doctor.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'doctor detail deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Doctor detail with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
