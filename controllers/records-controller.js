const Record = require('../models/record');

const recordsController = {};

recordsController.findByPhoneNum = (req,res) => {
    console.log(req.params.phone_num);
    Record.findByPhoneNum(req.params.phone_num)
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports = recordsController;