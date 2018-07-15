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
recordsController.findUserByLocation = (req,res) => {
    Record.findUserByLocation(req.params.location_char + '%')
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
        point:req.body.point
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
    .then(serviceNums => {
        function padNumbers(number, size){
            var s = number + "";
            while (s.length < size) s = "0" + s;
            return s;
          }
        for(var i = 1; i < serviceNums.length; i ++){
            if(parseInt(serviceNums[i].service_num.replace(/\D/g,'')) - parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) != 1){
                res.json("HD" + (padNumbers((parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }else if(i === serviceNums.length - 1){
                res.json("HD" + (padNumbers((parseInt(serviceNums[i].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewH = (req, res) => {
    Record.getNewH()
    .then(serviceNums => {
        function padNumbers(number, size){
            var s = number + "";
            while (s.length < size) s = "0" + s;
            return s;
          }
        for(var i = 1; i < serviceNums.length; i ++){
            if(parseInt(serviceNums[i].service_num.replace(/\D/g,'')) - parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) != 1){
                res.json("H" + (padNumbers((parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }else if(i === serviceNums.length - 1){
                res.json("H" + (padNumbers((parseInt(serviceNums[i].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewM = (req, res) => {
    Record.getNewM()
    .then(serviceNums => {
        function padNumbers(number, size){
            var s = number + "";
            while (s.length < size) s = "0" + s;
            return s;
          }
        for(var i = 1; i < serviceNums.length; i ++){
            if(parseInt(serviceNums[i].service_num.replace(/\D/g,'')) - parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) != 1){
                res.json("M" + (padNumbers((parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }else if(i === serviceNums.length - 1){
                res.json("M" + (padNumbers((parseInt(serviceNums[i].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewM8 = (req, res) => {
    Record.getNewM8()
    .then(serviceNums => {
        for(var i = 1; i < serviceNums.length; i ++){
            if(parseInt(serviceNums[i].service_num.replace(/\D/g,'')) - parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) != 1){
                res.json("M" + (parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) + 1));
                break;
            }else if(i === serviceNums.length - 1){
                res.json("M" + (parseInt(serviceNums[i].service_num.replace(/\D/g,'')) + 1));
                break;
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.getNewY = (req, res) => {
    Record.getNewY()
    .then(serviceNums => {
        function padNumbers(number, size){
            var s = number + "";
            while (s.length < size) s = "0" + s;
            return s;
          }
        for(var i = 1; i < serviceNums.length; i ++){
            if(parseInt(serviceNums[i].service_num.replace(/\D/g,'')) - parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) != 1 && i < serviceNums.length - 1){
                res.json("Y" + (padNumbers((parseInt(serviceNums[i-1].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }else if(i === serviceNums.length - 1){
                res.json("Y" + (padNumbers((parseInt(serviceNums[i].service_num.replace(/\D/g,'')) + 1), 4)));
                break;
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
recordsController.updateUser = (req, res) => {
    Record.updateUser(req.body.make, req.body.plate, req.body.driver_name, req.body.phone_num, req.body.point, req.params.id)
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

// recordsController.exportBetweenDates = (req, res) => {
//     Record.exportBetweenDates()
//     .then(record => {
//         res.json(record);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// }

recordsController.getRecordBetweenDates = (req, res) => {
    Record.getRecordBetweenDates(req.params.start_date, req.params.end_date, (req.params.location_char + '%'))
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

recordsController.getRecentRecords = (req, res) => {
    Record.getRecentRecords(req.params.location_char + '%')
    .then(record => {
        res.json(record);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}


module.exports = recordsController;