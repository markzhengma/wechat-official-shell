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

module.exports = Option;