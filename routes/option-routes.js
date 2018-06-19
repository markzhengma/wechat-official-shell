const express = require('express');
const optionRoutes = express.Router();
const optionsController = require('../controllers/options-controller');

optionRoutes.get('/all-names', optionsController.findAllNames);
optionRoutes.get('/all-ops', optionsController.findAllOperators);
optionRoutes.get('/all-gifts', optionsController.findAllGifts);
optionRoutes.post('/new-name-list', optionsController.createNameList);
optionRoutes.put('/update/name-list/:id', optionsController.updateNameList);
optionRoutes.delete('/delete/name-list/:id', optionsController.deleteNameList);
optionRoutes.post('/new-op-list', optionsController.createOperatorList);
optionRoutes.put('/update/op-list/:id', optionsController.updateOperatorList);
optionRoutes.delete('/delete/op-list/:id', optionsController.deleteOperatorList);

module.exports = optionRoutes;