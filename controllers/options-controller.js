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


module.exports = optionsController;