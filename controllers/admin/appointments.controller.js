const db = require('../../models/index');
const serialize = require('../../serializers/appointment.serializer');
const { httpStatusCodes } = require('../../utilities/Errors/BaseError');
const { Api404Error, Api422Error } = require('../../utilities/Errors/errorHandler');

const { User, Appointment, Payment } = db;

exports.index = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: 'doctor',
        },
        {
          model: User,
          as: 'patient',
        },
        {
          model: Payment,
          as: 'payment',
        },
      ],
    });
    const responseData = await serialize.index(appointments);

    res.status(200).send({
      appointments: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.show = async (req, res) => {
  try {
    const appointment = await Appointment.findOne(
      {
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: User,
            as: 'doctor',
          },
          {
            model: User,
            as: 'patient',
          },
        ],
      },
    );
    const responseData = await serialize.show(appointment);
    res.status(200).send({
      appointment: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(error.message),
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (appointment) {
      Appointment.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({
        message: 'Appointment deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Appointment with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
