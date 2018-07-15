const db = require('../db/config');
const Record = {};
const fs = require('fs');
const json2csv = require('json2csv').parse;

Record.findUserByPlate = plate => {
    return db.query(`
        SELECT *
        FROM users
        WHERE plate = $1;
    `, [plate])
}
Record.findUserByPhone = phone_num => {
    return db.query(`
        SELECT *
        FROM users
        WHERE phone_num = $1;
    `, [phone_num])
}
Record.findUserByName = driver_name => {
    return db.query(`
        SELECT *
        FROM users
        WHERE driver_name = $1;
    `, [driver_name])
}
Record.findUserByService = service_num => {
    return db.query(`
        SELECT *
        FROM users
        WHERE service_num = $1;
    `, [service_num])
}
Record.findUserByLocation = location_char => {
    return db.query(`
        SELECT 
        id, service_num, make, plate, driver_name, phone_num
        FROM users
        WHERE service_num LIKE $1
        ORDER BY service_num
    `, [location_char])
}
Record.findRecordByService = service_num => {
    return db.query(`
        SELECT *
        FROM users_records
        WHERE record_id = $1
        ORDER BY record_time DESC
    `, [service_num])
}


Record.create = users_records => {
    return db.one(`
        INSERT INTO users_records(
            record_time, 
            record_name, 
            record_milage, 
            record_operator, 
            record_gift, 
            record_detail, 
            record_id
        )
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

Record.createUser = user => {
    return db.one(`
        INSERT INTO users(
            service_num,
            make,
            plate,
            driver_name,
            phone_num,
            detail
        )
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [user.service_num, 
        user.make, 
        user.plate, 
        user.driver_name, 
        user.phone_num,
        user.detail])
}

Record.getNewHD = () => {
    return db.query(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'HD%'
        ORDER BY service_num ASC;
    `)
}
Record.getNewH = () => {
    return db.query(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'H%'
        AND service_num NOT LIKE 'HD%'
        ORDER BY service_num ASC;
    `)
}
Record.getNewM = () => {
    return db.query(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'M%'
        AND service_num NOT LIKE 'M8%'
        ORDER BY service_num ASC;
    `)
}
Record.getNewM8 = () => {
    return db.query(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'M8%'
        ORDER BY service_num ASC;
    `)
}
Record.getNewY = () => {
    return db.query(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'Y%'
        ORDER BY service_num ASC;
    `)
}
Record.updateUser = (make, plate, driver_name, phone_num, detail, id) => {
    return db.one(`
        UPDATE users SET
        make = $1,
        plate = $2,
        driver_name = $3,
        phone_num = $4,
        detail = $5
        WHERE id = $6
        RETURNING *
    `, [make, plate, driver_name, phone_num, detail, id]);
}
Record.updateRecord = (record_time, record_name, record_milage, record_operator, record_gift, record_detail, id) => {
    return db.one(`
        UPDATE users_records SET
        record_time = $1,
        record_name = $2,
        record_milage = $3,
        record_operator = $4,
        record_gift = $5,
        record_detail = $6
        WHERE id = $7
        RETURNING *
    `, [record_time, record_name, record_milage, record_operator, record_gift, record_detail, id]);
}

Record.destroyUser = (id) => {
    return db.none(`
        DELETE FROM users where id = $1
    `, [id]);
}
Record.destroyRecord = (id) => {
    return db.none(`
        DELETE FROM users_records where id = $1
    `, [id]);
}

Record.getRecordBetweenDates = (start_date, end_date, location_char) => {
    return db.any(`
        SELECT * FROM users_records
        WHERE (record_time
        BETWEEN $1 AND $2)
        AND record_id LIKE $3
        ORDER BY record_time, record_name
    `, [start_date, end_date, location_char]);
}

Record.getRecentRecords = (location_char) => {
    return db.any(`
        SELECT * from users_records
        WHERE record_id LIKE $1
        ORDER BY id DESC
        LIMIT 10
    `, [location_char])
}

module.exports = Record;