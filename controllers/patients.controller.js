const db = require('../models/index');
const serialize = require('../serializers/patient.serializer');

const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { Patient } = db;

exports.show = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { user_id: req.params.id } });
    const responseData = await serialize.show(patient);
    res.status(200).send({
      patient_detail: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Patient health detail with id: ${req.params.id} not found.`),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    const responseData = await serialize.show(patient);
    res.status(201).send({
      patient_detail: responseData,
      message: 'Patient health detail created',
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { user_id: req.params.id } });
    if (patient) {
      patient.update(req.body);
      const responseData = await serialize.show(patient);
      res.status(202).send({
        patient_detail: responseData,
        message: 'Patient health detail updated',

      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Patient health detail with id: ${req.params.id} not found.`),
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
    const patient = await Patient.findOne({ where: { user_id: req.params.id } });
    if (patient) {
      Patient.destroy({
        where: { user_id: req.params.id },
      });
      res.send({
        message: 'Patient health detail deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Patient health detail with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
