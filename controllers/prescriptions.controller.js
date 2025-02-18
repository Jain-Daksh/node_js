const db = require('../models/index');
const serialize = require('../serializers/prescription.serializer');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');
const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');

const { Prescription } = db;

exports.show = async (req, res) => {
  try {
    const prescription = await Prescription.findAll({ where: { patient_id: req.params.id } });
    const responseData = await serialize.index(prescription);
    res.status(200).send({
      Prescription: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Prescription with id: ${req.params.id} not found.`),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    const responseData = await serialize.show(prescription);
    res.status(201).send({
      Prescription: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({ where: { patient_id: req.params.id } });
    if (prescription) {
      prescription.update(req.body);
      const responseData = await serialize.show(prescription);
      res.status(202).send({
        Prescription: responseData,
        message: 'Prescription updated',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Prescription with id: ${req.params.id} not found.`),

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
    const prescription = await Prescription.findOne({ where: { patient_id: req.params.id } });
    if (prescription) {
      Prescription.destroy({
        where: { patient_id: req.params.id },
      });
      res.send({
        message: 'Prescription deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Prescription with id: ${req.params.id} not found.`),

      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
