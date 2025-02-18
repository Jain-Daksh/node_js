const db = require('../models/index');
const serialize = require('../serializers/medical_record.serializer');
const { S3_UPLOAD } = require('../utilities/S3Bucket');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');
const { Api404Error, Api422Error } = require('../utilities/Errors/errorHandler');

const { MedicalRecord } = db;

exports.show = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findAll({ where: { patient_id: req.params.id } });
    if (medicalRecord) {
      const responseData = await serialize.index(medicalRecord);
      res.status(200).send({
        patient_medical_record: responseData,
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Patient medical record with id: ${req.params.id} not found.`),
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
    S3_UPLOAD(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        const medicalRecord = await MedicalRecord.create(req.body);
        const responseData = await serialize.show(medicalRecord);
        res.status(201).send({
          message: responseData,
        });
      }
    });
    const medicalRecord = await MedicalRecord.create(req.body);
    const responseData = await serialize.show(medicalRecord);
    res.status(201).send({
      patient_medical_record: responseData,
      message: 'Patient medical record added',
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findAll({ where: { patient_id: req.params.id } });
    if (medicalRecord) {
      MedicalRecord.destroy({
        where: { patient_id: req.params.id },
      });
      res.send({
        message: 'Patient medical detail deleted',
      });
    } else {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: new Api404Error(`Patient medical record with id: ${req.params.id} not found.`),
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
