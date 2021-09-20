SELECT maps.*
FROM users
JOIN authorizations ON users.id = authorizations.user_id
JOIN maps ON maps.id = authorizations.map_id
WHERE users.id = 3;
