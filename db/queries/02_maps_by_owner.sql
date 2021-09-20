SELECT *
FROM maps
JOIN users
ON owner_id = users.id
WHERE users.id = 1;
