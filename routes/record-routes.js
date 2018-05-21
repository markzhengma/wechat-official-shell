const express = require('express');
const recordRoutes = express.Router();
const recordsController = require('../controllers/records-controller');

recordRoutes.get('/:phone_num', recordsController.findByPhoneNum);

module.exports = recordRoutes;