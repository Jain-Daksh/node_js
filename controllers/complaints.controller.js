const db = require('../models/index');
const serialize = require('../serializers/complaint.serializer');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');
const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');

const { Complaint } = db;

exports.show = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ where: { id: req.params.id } });
    const responseData = await serialize.show(complaint);
    res.status(200).send({
      complaint: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Complaint with id: ${req.params.id} not found.`),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    const responseData = await serialize.show(complaint);
    res.status(201).send({
      complaint: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ where: { id: req.params.id } });
    if (complaint) {
      complaint.update(req.body);
      const responseData = await serialize.show(complaint);
      res.status(202).send({
        complaint: responseData,
        message: 'Complaint updated',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Complaint with id: ${req.params.id} not found.`),

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
    const complaint = await Complaint.findOne({ where: { id: req.params.id } });
    if (complaint) {
      complaint.destroy({
        where: { id: req.params.id },
      });
      res.send({
        message: 'Complaint deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Complaint with id: ${req.params.id} not found.`),

      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
