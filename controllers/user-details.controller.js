const db = require('../models/index');
const serialize = require('../serializers/user-details.serializer');

const { UserDetails, User } = db;

exports.show = async (req, res) => {
  try {
    const userDetail = await UserDetails.findOne({
      where: { user_id: req.params.id },
      include: [{
        model: User,
        as: 'user',
      }],
    });
    if (userDetail) {
      const responseData = await serialize.show(userDetail);
      res.status(200).send({
        user_detail: responseData,
      });
    } else {
      res.status(404).send({
        message: 'User health detail not found.',
      });
    }
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};
exports.create = async (req, res) => {
  try {
    const userDetail = await UserDetails.create(req.body);
    const responseData = await serialize.show(userDetail);
    res.status(201).send({
      user_detail: responseData,
      message: 'User health detail created',
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const userDetail = await UserDetails.findOne({ where: { user_id: req.params.id } });
    if (userDetail) {
      userDetail.update(req.body);
      const responseData = await serialize.show(userDetail);
      res.status(202).send({
        user_detail: responseData,
        message: 'User health detail updated',

      });
    } else {
      res.status(404).send({
        message: 'User health detail not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const userDetail = await UserDetails.findOne({ where: { user_id: req.params.id } });
    if (userDetail) {
      UserDetails.destroy({
        where: { user_id: req.params.id },
      });
      res.send({
        message: 'User health detail deleted',
      });
    } else {
      res.status(404).send({
        message: 'User health detail not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
