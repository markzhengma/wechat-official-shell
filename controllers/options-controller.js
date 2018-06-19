const Option = require('../models/option');

const optionsController = {};

optionsController.findAllNames = (req,res) => {
    Option.findAllNames()
    .then(record_name_list => {
        res.json(record_name_list)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};

optionsController.findAllOperators = (req,res) => {
    Option.findAllOperators()
    .then(record_operator_list => {
        res.json(record_operator_list)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};

optionsController.findAllGifts = (req,res) => {
    Option.findAllGifts()
    .then(record_gift_list => {
        res.json(record_gift_list)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};

optionsController.updateNameList = (req, res) => {
    Option.updateNameList(req.body.record_name, req.body.type, req.params.id)
    .then(nameList => {
        res.json(nameList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

optionsController.deleteNameList = (req, res) => {
    Option.destroyNameList(req.params.id)
    .then(nameList => {
        res.json(nameList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

optionsController.createNameList = (req, res) => {
    Option.createNameList({
        record_name: req.body.record_name, 
        type: req.body.type, 
    })
    .then(nameList => {
        res.json(nameList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports = optionsController;