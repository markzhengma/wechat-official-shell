-- \c wechat_shell_db;

INSERT INTO users
    (service_num, make, plate, driver_name, phone_num)
VALUES
    ('Y0001', '羚羊','蒙EYL572', '赵永刚', '13722012233'),
    ('Y0002', '驭菱', '蒙ECZ987', '刘长柱', '13190985762');

INSERT INTO users_records
    (record_time, record_name, record_milage, record_operator, record_gift, record_detail, record_id)
VALUES
    ('12-MAR-13', 'HX3', 172000, '顾丛刚', '', '累计两桶', 'Y0001'),
    ('23-JAN-13', 'HX3', 165909, '顾丛刚', '毛巾', '', 'Y0001'),
    ('26-APR-13', '', 176175, '顾丛刚', '', '余油', 'Y0001'),
    ('24-MAR-13', 'HX3C', 1846, '顾丛刚', '香皂', '', 'Y0002');
