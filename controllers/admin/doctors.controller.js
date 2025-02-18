const db = require('../../models/index');
const serialize = require('../../serializers/user.serializer');
const { getPagination } = require('../../utilities/Pagination');
const { Api404Error, Api422Error } = require('../../utilities/Errors/errorHandler');
const { httpStatusCodes } = require('../../utilities/Errors/BaseError');

const { User } = db;
const doctors = User.scope('doctor');

exports.index = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const doctorLists = await doctors.findAll({
      offset: offset,
      limit: limit,
    });
    const responseData = await serialize.index(doctorLists);
    res.status(200).send({
      doctors: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error('Doctors details  not found.'),
    });
  }
};

exports.show = async (req, res) => {
  try {
    const doctor = await doctors.findOne({
      where: { id: req.params.id },
    });
    const responseData = await serialize.showDoctor(doctor);
    res.status(200).send({
      doctor: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Doctor detail  with id: ${req.params.id} not found.`),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const doctor = await User.create(req.body);
    const responseData = await serialize.show(doctor);
    res.status(201).send({
      doctor: responseData,
      message: 'Doctor created',
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const doctor = await doctors.findOne({
      where: { id: req.params.id },
    });
    if (doctor) {
      doctor.update(req.body);
      const responseData = await serialize.show(doctor);
      res.status(201).send({
        doctor: responseData,
        message: 'Doctor updated',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Doctor detail  with id: ${req.params.id} not found.`),
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
    const doctor = await doctors.findOne({ where: { id: req.params.id } });
    if (doctor) {
      doctor.destroy();
      res.status(202).send({
        message: 'doctor deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Doctor detail  with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
