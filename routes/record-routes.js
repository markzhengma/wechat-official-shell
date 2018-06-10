const express = require('express');
const recordRoutes = express.Router();
const recordsController = require('../controllers/records-controller');

recordRoutes.get('/newhd', recordsController.getNewHD);
recordRoutes.get('/newh', recordsController.getNewH);
recordRoutes.get('/newm', recordsController.getNewM);
recordRoutes.get('/newm8', recordsController.getNewM8);
recordRoutes.get('/newy', recordsController.getNewY);
recordRoutes.get('/:plate', recordsController.findByPlate);
recordRoutes.post('/new-record', recordsController.create);
recordRoutes.post('/new-user', recordsController.createUser);

module.exports = recordRoutes;