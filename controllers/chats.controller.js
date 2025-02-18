const { Op } = require('sequelize');
const db = require('../models/index');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');
const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');

const { Chat } = db;
const serialize = require('../serializers/chats.serializer');


exports.show = async (req, res) => {
  try {
    const chat = await Chat.findByPk(req.params.id);
    const responseData = await serialize.show(chat);
    res.status(200).send({
      chat: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(`chat  with id: ${req.params.id} not found.`),
    });
  }
};

exports.create = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                sender_id: req.body.sender_id,
              },
              {
                receiver_id: req.body.receiver_id,
              }],
          },
          {
            [Op.and]: [
              {
                sender_id: req.body.receiver_id,
              },
              {
                receiver_id: req.body.sender_id,
              },
            ],
          },
        ],
      },
    });
    if (chat) {
      const responseData = await serialize.show(chat);
      res.status(200).send({
        chat: responseData,
      });
    } else {
      const chatroom = await Chat.create(req.body);
      const responseData = await serialize.show(chatroom);
      res.status(201).send({
        chat: responseData,
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
