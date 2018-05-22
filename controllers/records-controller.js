const Record = require('../models/record');

const recordsController = {};

recordsController.findByPlate = (req,res) => {
    console.log(req.params.plate);
    Record.findByPlate(req.params.plate)
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports = recordsController;