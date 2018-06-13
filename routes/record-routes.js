const express = require('express');
const recordRoutes = express.Router();
const recordsController = require('../controllers/records-controller');

recordRoutes.get('/newhd', recordsController.getNewHD);
recordRoutes.get('/newh', recordsController.getNewH);
recordRoutes.get('/newm', recordsController.getNewM);
recordRoutes.get('/newm8', recordsController.getNewM8);
recordRoutes.get('/newy', recordsController.getNewY);
recordRoutes.get('/plate/:plate', recordsController.findUserByPlate);
recordRoutes.get('/phone/:phone_num', recordsController.findUserByPhone);
recordRoutes.get('/name/:driver_name', recordsController.findUserByName);
recordRoutes.get('/service/:service_num', recordsController.findUserByService);
recordRoutes.get('/search/:service_num', recordsController.findRecordByService);
recordRoutes.post('/new-record', recordsController.create);
recordRoutes.post('/new-user', recordsController.createUser);
recordRoutes.put('/update/user/:id', recordsController.updateUser);
recordRoutes.put('/update/record/:id', recordsController.updateRecord);

module.exports = recordRoutes;