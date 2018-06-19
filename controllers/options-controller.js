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
optionsController.updateOperatorList = (req, res) => {
    Option.updateOperatorList(req.body.record_operator, req.body.location, req.params.id)
    .then(opList => {
        res.json(opList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

optionsController.deleteOperatorList = (req, res) => {
    Option.destroyOperatorList(req.params.id)
    .then(opList => {
        res.json(opList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

optionsController.createOperatorList = (req, res) => {
    Option.createOperatorList({
        record_operator: req.body.record_operator, 
        location: req.body.location, 
    })
    .then(opList => {
        res.json(opList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}
optionsController.updateGiftList = (req, res) => {
    Option.updateGiftList(req.body.record_gift, req.params.id)
    .then(giftList => {
        res.json(giftList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

optionsController.deleteGiftList = (req, res) => {
    Option.destroyGiftList(req.params.id)
    .then(giftList => {
        res.json(giftList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

optionsController.createGiftList = (req, res) => {
    Option.createGiftList({
        record_gift: req.body.record_gift, 
    })
    .then(giftList => {
        res.json(giftList);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports = optionsController;