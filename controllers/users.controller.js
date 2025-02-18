const db = require('../models/index');
const serialize = require('../serializers/user.serializer');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');
const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');

const { User } = db;

exports.show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const responseData = await serialize.show(user);
    res.status(200).send({
      user: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`User with id: ${req.params.id} not found.`),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const responseData = await serialize.show(user);
    res.status(201).send({
      user: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.update(req.body);
      // const responseData = await serialize.show(user);
      res.status(202).send({
        user: user,
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`User with id: ${req.params.id} not found.`),
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
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'user deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`User with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
