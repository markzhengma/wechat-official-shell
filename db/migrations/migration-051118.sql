\c wechat_shell_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    service_num VARCHAR(255) UNIQUE NOT NULL,
    make VARCHAR(255) NOT NULL,
    plate VARCHAR(255) UNIQUE NOT NULL,
    driver_name TEXT NOT NULL,
    phone_num VARCHAR(255) UNIQUE NOT NULL,
    password_digest TEXT
);

CREATE TABLE IF NOT EXISTS users_records (
    id SERIAL PRIMARY KEY,
    record_time TIMESTAMP,
    record_name TEXT,
    record_milage INTEGER,
    record_operator TEXT,
    record_gift TEXT,
    record_detail TEXT,
    record_id VARCHAR(255) REFERENCES users(service_num)
);