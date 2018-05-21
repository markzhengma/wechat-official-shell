const db = require('../db/config');

const Record = {};

Record.findByPhoneNum = phone_num => {
    console.log("this is from the model!");
    return db.query(`
        SELECT 
            users.driver_name,
            users.plate,
            users.phone_num,
            users_records.record_time,
            users_records.record_name,
            users_records.record_detail,
            users_records.record_location
        FROM users_records
        LEFT JOIN users
        ON users.id=users_records.user_id
        AND users.phone_num = $1;
    `, [phone_num]);
};

module.exports = Record;