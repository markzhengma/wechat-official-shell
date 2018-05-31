const db = require('../db/config');

const Record = {};

Record.findByPlate = plate => {
    return db.query(`
        SELECT 
            users.driver_name,
            users.plate,
            users.make,
            users.phone_num,
            users.service_num,
            users_records.record_time,
            users_records.record_name,
            users_records.record_milage,
            users_records.record_operator,
            users_records.record_gift,
            users_records.record_detail
        FROM users_records
        INNER JOIN users
        ON users.service_num=users_records.record_id
        AND users.plate = $1
        ORDER BY users_records.record_time DESC;
    `, [plate]);
};

Record.create = users_records => {
    return db.one(`
    INSERT INTO users_records
    (record_time, 
        record_name, 
        record_milage, 
        record_operator, 
        record_gift, 
        record_detail, 
        record_id)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `, [users_records.record_time, 
        users_records.record_name, 
        users_records.record_milage, 
        users_records.record_operator, 
        users_records.record_gift, 
        users_records.record_detail, 
        users_records.record_id])
}

module.exports = Record;