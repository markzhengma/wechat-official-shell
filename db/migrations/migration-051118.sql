\c wechat_shell_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    service_num VARCHAR(255) UNIQUE NOT NULL,
    make VARCHAR(255),
    plate VARCHAR(255),
    driver_name TEXT,
    phone_num VARCHAR(255),
    password_digest TEXT
);

CREATE TABLE IF NOT EXISTS users_records (
    id SERIAL PRIMARY KEY,
    record_time TIMESTAMP,
    record_name TEXT,
    record_milage VARCHAR(255),
    record_operator TEXT,
    record_gift TEXT,
    record_detail TEXT,
    record_id VARCHAR(255) REFERENCES users(service_num)
);