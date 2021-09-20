SELECT pins.*, maps.title as map_title FROM pins
JOIN maps ON pins.map_id = maps.id
JOIN users ON users.id = pins.user_id
WHERE maps.id = 1;
