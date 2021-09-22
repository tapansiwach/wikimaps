INSERT INTO authorizations (user_id, map_id)
SELECT users.id, 32 as map_id
FROM users
WHERE users.email = 'ncoumbe2@google.cn';
