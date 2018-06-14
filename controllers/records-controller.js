const Record = require('../models/record');

const recordsController = {};

recordsController.findUserByPlate = (req,res) => {
    console.log(req.params.plate);
    Record.findUserByPlate(req.params.plate)
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};
recordsController.findRecordByService = (req,res) => {
    Record.findRecordByService(req.params.service_num)
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.findUserByPhone = (req,res) => {
    console.log(req.params.phone_num);
    Record.findUserByPhone(req.params.phone_num)
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};
recordsController.findUserByName = (req,res) => {
    console.log(req.params.driver_name);
    Record.findUserByName(req.params.driver_name)
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};
recordsController.findUserByService = (req,res) => {
    console.log(req.params.service_num);
    Record.findUserByService(req.params.service_num)
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

recordsController.getNewHD = (req, res) => {
    Record.getNewHD()
    .then(serviceNum => {
        res.json(serviceNum);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewH = (req, res) => {
    Record.getNewH()
    .then(serviceNum => {
        res.json(serviceNum);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewM = (req, res) => {
    Record.getNewM()
    .then(serviceNum => {
        res.json(serviceNum);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewM8 = (req, res) => {
    Record.getNewM8()
    .then(serviceNum => {
        res.json(serviceNum);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewY = (req, res) => {
    Record.getNewY()
    .then(serviceNum => {
        res.json(serviceNum);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.updateUser = (req, res) => {
    Record.updateUser(req.body.make, req.body.plate, req.body.driver_name, req.body.phone_num, req.params.id)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}
recordsController.updateRecord = (req, res) => {
    Record.updateRecord(req.body.record_time, req.body.record_name, req.body.record_milage, req.body.record_operator, req.body.record_gift, req.body.record_detail, req.params.id)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

recordsController.deleteUser = (req, res) => {
    Record.destroyUser(req.params.id)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.deleteRecord = (req, res) => {
    Record.destroyRecord(req.params.id)
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}


module.exports = recordsController;