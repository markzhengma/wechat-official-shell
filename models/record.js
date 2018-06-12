const db = require('../db/config');

const Record = {};

Record.findUserByPlate = plate => {
    return db.query(`
        SELECT 
            driver_name,
            plate,
            make,
            phone_num,
            service_num
        FROM users
        WHERE plate = $1;
    `, [plate])
}
Record.findUserByPhone = phone_num => {
    return db.query(`
        SELECT 
            driver_name,
            plate,
            make,
            phone_num,
            service_num
        FROM users
        WHERE phone_num = $1;
    `, [phone_num])
}
Record.findUserByName = driver_name => {
    return db.query(`
        SELECT 
            driver_name,
            plate,
            make,
            phone_num,
            service_num
        FROM users
        WHERE driver_name = $1;
    `, [driver_name])
}
Record.findUserByService = service_num => {
    return db.query(`
        SELECT 
            driver_name,
            plate,
            make,
            phone_num,
            service_num
        FROM users
        WHERE service_num = $1;
    `, [service_num])
}
Record.findRecordByService = service_num => {
    return db.query(`
        SELECT
            record_time,
            record_name,
            record_milage,
            record_operator,
            record_gift,
            record_detail,
            record_id
        FROM users_records
        WHERE record_id = $1;
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
            phone_num
        )
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `, [user.service_num, 
        user.make, 
        user.plate, 
        user.driver_name, 
        user.phone_num])
}

Record.getNewHD = () => {
    return db.one(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'HD%'
        ORDER BY service_num DESC
        LIMIT 1;
    `)
}
Record.getNewH = () => {
    return db.one(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'H%'
        AND service_num NOT LIKE 'HD%
        ORDER BY service_num DESC
        LIMIT 1;
    `)
}
Record.getNewM = () => {
    return db.one(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'M%'
        AND service_num NOT LIKE 'M8%'
        ORDER BY service_num DESC
        LIMIT 1;
    `)
}
Record.getNewM8 = () => {
    return db.one(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'M8%'
        ORDER BY service_num DESC
        LIMIT 1;
    `)
}
Record.getNewY = () => {
    return db.one(`
        SELECT service_num
        FROM users
        WHERE service_num LIKE 'Y%'
        ORDER BY service_num DESC
        LIMIT 1;
    `)
}

module.exports = Record;