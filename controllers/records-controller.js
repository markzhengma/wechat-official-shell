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
};

recordsController.create = (req, res) => {
    Record.create({
        record_time: req.body.record_time, 
        record_name: req.body.record_name, 
        record_milage: req.body.record_milage, 
        record_operator: req.body.record_operator, 
        record_gift: req.body.record_gift, 
        record_detail: req.body.record_detail, 
        record_id: req.body.record_id
    })
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

recordsController.createUser = (req, res) => {
    Record.createUser({
        service_num:req.body.service_num,
        make:req.body.make,
        plate:req.body.plate,
        driver_name:req.body.driver_name,
        phone_num:req.body.phone_num,
    })
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports = recordsController;