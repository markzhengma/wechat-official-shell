const express = require('express');
const recordRoutes = express.Router();
const recordsController = require('../controllers/records-controller');

recordRoutes.get('/:plate', recordsController.findByPlate);

module.exports = recordRoutes;