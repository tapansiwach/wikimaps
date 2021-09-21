SELECT users.user_name, users.first_name, users.last_name, users.profile_pic_url, maps.* FROM maps
JOIN users ON users.id = maps.owner_id;
