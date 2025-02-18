const db = require('../models/index');
const serialize = require('../serializers/appointment.serializer');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');
const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');

const { User, Appointment, Payment } = db;

exports.index = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        patient_id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'doctor',
        },
        {
          model: Payment,
          as: 'payment',
        },
      ],
    });
    const responseData = await serialize.showDoctors(appointments);

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
          {
            model: Payment,
            as: 'payment',
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

exports.create = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        doctor_id: req.body.doctor_id, time: req.body.time, date: req.body.date,
      },
    });
    if (!appointment) {
      const app = await Appointment.create(req.body);
      res.send({
        message: app,
      });
    } else {
      res.send('not available');
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const doctor = await User.findOne(
      {
        where: { id: req.params.id },
        include: [{
          model: Appointment,
          as: 'patient',
        }],
      },
    );
    if (doctor) {
      doctor.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'appointment booking deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`appointment booking  with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
