const express = require('express');
const recordRoutes = express.Router();
const recordsController = require('../controllers/records-controller');

recordRoutes.get('/:plate', recordsController.findByPlate);
recordRoutes.post('/new-record', recordsController.create);
recordRoutes.post('/new-user', recordsController.createUser);

module.exports = recordRoutes;