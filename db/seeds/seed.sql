\c wechat_shell_db;

INSERT INTO users
    (phone_num, password_digest, driver_name, plate)
VALUES
    ('13804706986', 'kajsdhgaksjdfoaijgh', '林红', '蒙E12345');

INSERT INTO users_records
    (record_time, record_location, record_name, record_detail, user_id)
VALUES
    ('19-MAY-18', '呼伦贝尔市河东金壳润滑油商行', '更换机油', '10W-30', 1);