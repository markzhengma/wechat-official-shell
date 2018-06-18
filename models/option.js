const db = require('../db/config');

const Option = {};

Option.findAllNames = () => {
    return db.query(`
        SELECT * 
        FROM record_name_list
    `)
}

Option.findAllOperators = () => {
    return db.query(`
        SELECT *
        FROM record_operator_list
    `)
}

Option.findAllGifts = () => {
    return db.query(`
        SELECT *
        FROM record_gift_list
    `)
}

module.exports = Option;