const db = require('../models/index');
const serialize = require('../serializers/treatment_history.serializer');

const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { TreatmentHistory } = db;

exports.index = async (req, res) => {
  try {
    const treatmentHistory = await TreatmentHistory.findAll({ where: { patient_id: req.params.id } });
    const responseData = await serialize.filter(treatmentHistory);
    res.status(200).send({
      treatment_history: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Treatment history with id: ${req.params.id} not found.`),
    });
  }
};

exports.show = async (req, res) => {
  try {
    const treatmentHistory = await TreatmentHistory.findOne({ where: { patient_id: req.params.id } });
    const responseData = await serialize.show(treatmentHistory);
    res.status(200).send({
      treatment_histories: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Treatment history with id: ${req.params.id} not found.`),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const treatmentHistory = await TreatmentHistory.create(req.body);
    const responseData = await serialize.show(treatmentHistory);
    res.status(201).send({
      treatment_history: responseData,
      message: 'Treatment history detail created',
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const treatmentHistory = await TreatmentHistory.findOne({ where: { id: req.params.id } });
    if (treatmentHistory) {
      treatmentHistory.update(req.body);
      const responseData = await serialize.show(treatmentHistory);
      res.status(202).send({
        treatment_history: responseData,
        message: 'Treatment history updated',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Treatment history with id: ${req.params.id} not found.`),
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
    const treatmentHistory = await TreatmentHistory.findOne({ where: { id: req.params.id } });
    if (treatmentHistory) {
      TreatmentHistory.destroy({
        where: { id: req.params.id },
      });
      res.send({
        message: 'Treatment history deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Treatment history with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
