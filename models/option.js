const db = require('../db/config');

const Option = {};

Option.findAllNames = () => {
    return db.query(`
        SELECT * 
        FROM record_name_list
        ORDER BY type ASC
    `)
}

Option.findAllOperators = () => {
    return db.query(`
        SELECT *
        FROM record_operator_list
        ORDER BY location ASC
    `)
}

Option.findAllGifts = () => {
    return db.query(`
        SELECT *
        FROM record_gift_list
    `)
}

Option.updateNameList = (record_name, type, id) => {
    return db.one(`
        UPDATE record_name_list SET
        record_name = $1,
        type = $2
        WHERE id = $3
        RETURNING *
    `, [record_name, type, id]);
}

Option.destroyNameList = (id) => {
    return db.none(`
        DELETE FROM record_name_list where id = $1
    `, [id]);
}

Option.createNameList = nameList => {
    return db.one(`
        INSERT INTO record_name_list(
            record_name,
            type
        )
        VALUES($1, $2)
        RETURNING *
    `, [nameList.record_name, 
        nameList.type])
}

Option.updateOperatorList = (record_operator, location, id) => {
    return db.one(`
        UPDATE record_operator_list SET
        record_operator = $1,
        location = $2
        WHERE id = $3
        RETURNING *
    `, [record_operator, location, id]);
}

Option.destroyOperatorList = (id) => {
    return db.none(`
        DELETE FROM record_operator_list where id = $1
    `, [id]);
}

Option.createOperatorList = opList => {
    return db.one(`
        INSERT INTO record_operator_list(
            record_operator,
            location
        )
        VALUES($1, $2)
        RETURNING *
    `, [opList.record_operator, 
        opList.location])
}
Option.updateGiftList = (record_gift, id) => {
    return db.one(`
        UPDATE record_gift_list SET
        record_gift = $1
        WHERE id = $2
        RETURNING *
    `, [record_gift, id]);
}

Option.destroyGiftList = (id) => {
    return db.none(`
        DELETE FROM record_gift_list where id = $1
    `, [id]);
}

Option.createGiftList = giftList => {
    return db.one(`
        INSERT INTO record_gift_list(
            record_gift
        )
        VALUES($1)
        RETURNING *
    `, [giftList.record_gift])
}

module.exports = Option;