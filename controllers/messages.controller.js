const db = require('../models/index');

const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');

const { Message } = db;
const serialize = require('../serializers/message.serializer');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

exports.index = async (req, res) => {
  try {
    const message = await Message.findAll({
      where: {
        chat_id: req.params.id,
      },
    });
    const responseData = await serialize.show(message);
    res.status(200).send({
      Chat: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`Message  with id: ${req.params.id} not found.`),
    });
  }
};

exports.show = async (req, res) => {
  try {
    const message = await Message.findOne({
      where: {
        chat_id: req.params.id,
      },
    });
    const responseData = await serialize.show(message);
    res.status(200).send({
      Chat: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    const responseData = await serialize.show(message);
    res.status(201).send({
      message: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
