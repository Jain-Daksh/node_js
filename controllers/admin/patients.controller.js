const db = require('../../models/index');
const serialize = require('../../serializers/user.serializer');
const { getPagination } = require('../../utilities/Pagination');
const { Api404Error, Api422Error } = require('../../utilities/Errors/errorHandler');
const { httpStatusCodes } = require('../../utilities/Errors/BaseError');

const { User } = db;
const patients = User.scope('patient');

exports.index = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const patientLists = await patients.findAll({
      offset: offset,
      limit: limit,
    });
    const responseData = await serialize.index(patientLists);
    res.status(200).send({
      patients: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(error.message),
    });
  }
};

exports.show = async (req, res) => {
  try {
    const patient = await patients.findOne({
      where: { id: req.params.id },
    });
    if (patient) {
      const responseData = await serialize.showPatient(patient);
      res.status(200).send({
        patient: responseData,
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Patient detail  with id: ${req.params.id} not found.`),
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
    const patient = await User.create(req.body);
    const responseData = await serialize.show(patient);
    res.status(201).send({
      patient: responseData,
      message: 'Patient created',
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const patient = await patients.findOne({
      where: { id: req.params.id },
    });
    if (patient) {
      patient.update(req.body);
      const responseData = await serialize.show(patient);
      res.status(201).send({
        patient: responseData,
        message: 'Patient updated',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Patient detail  with id: ${req.params.id} not found.`),
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
    const patient = await patients.findOne({
      where: { id: req.params.id },
    });
    if (patient) {
      patient.destroy();
      res.status(202).send({
        message: 'Patient deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Patient detail  with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
