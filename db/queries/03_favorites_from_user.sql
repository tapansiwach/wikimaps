SELECT *
FROM favorites
JOIN users
ON favorites.user_id = users.id
WHERE users.id = 2;
