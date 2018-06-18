const express = require('express');
const optionRoutes = express.Router();
const optionsController = require('../controllers/options-controller');

optionRoutes.get('/all-names', optionsController.findAllNames);
optionRoutes.get('/all-ops', optionsController.findAllOperators);
optionRoutes.get('/all-gifts', optionsController.findAllGifts);

module.exports = optionRoutes;