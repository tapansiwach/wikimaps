SELECT users.*, maps.id as map_id
FROM users
JOIN authorizations ON users.id = authorizations.user_id
JOIN maps ON maps.id = authorizations.map_id
WHERE maps.id = 2;
