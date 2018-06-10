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