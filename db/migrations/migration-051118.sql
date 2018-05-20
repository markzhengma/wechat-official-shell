\c wechat_shell_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    phone_num VARCHAR(255) UNIQUE NOT NULL,
    password_digest TEXT NOT NULL,
    driver_name TEXT NOT NULL,
    plate VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users_records (
    id SERIAL PRIMARY KEY,
    record_time TIMESTAMP,
    record_location TEXT NOT NULL,
    record_name TEXT NOT NULL,
    record_detail TEXT,
    user_id INTEGER REFERENCES users(id)
);