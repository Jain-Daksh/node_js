const express = require('express');

const router = express.Router();

// api routes

require('./user-details.routes')(router);
require('./prescription.routes')(router);
require('./treatment_history.router')(router);
require('./review.routes')(router);
require('./patient.routes')(router);
require('./doctor.routes')(router);
require('./medical_record.routes')(router);
require('./auth.routes')(router);
require('./chat.routes')(router);
require('./message.routes')(router);
require('./user.routes')(router);
require('./appointment.routes')(router);
require('./complaint.routes')(router);
require('./payment.routes')(router);
require('./appointment_doctor.routes')(router);

// admin routes

require('./admin/doctor.routes')(router);
require('./admin/patient.router')(router);
require('./admin/count.routes')(router);
require('./admin/appointments.routes')(router);

module.exports.router = router;
