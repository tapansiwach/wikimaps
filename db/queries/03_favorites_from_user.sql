SELECT users.id as user_id, maps.*
FROM favorites
JOIN users ON favorites.user_id = users.id
JOIN maps ON favorites.map_id = maps.id
WHERE users.id = 2;
