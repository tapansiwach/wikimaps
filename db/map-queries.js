const db = require('./db');

const getMaps = () => {
  return db.query(`SELECT users.user_name, users.first_name, users.last_name, users.profile_pic_url,
                    maps.* FROM maps
                    JOIN users ON users.id = maps.owner_id;
  `)
    .then((response) => {
      return response.rows;
    });
};

const getMapById = (id) => {
  return db.query('SELECT * FROM maps WHERE id = $1;', [id])
    .then((response) => {
      return response.rows[0];
    });
};

const getAuthorizedUsersByMap = (map_id) => {
  return db.query(`SELECT users.*, maps.id as map_id
                    FROM users
                    JOIN authorizations ON users.id = authorizations.user_id
                    JOIN maps ON maps.id = authorizations.map_id
                    WHERE maps.id = $1;
  `, [map_id])
    .then((response) => {
      return response.rows;
    });
};

const insertMap = (owner_id, title, city, lat, long, zoom, created_on, modified_on) => {
  return db.query(`INSERT INTO maps (owner_id, title, city, lat, long, zoom, created_on, modified_on)
                    VALUES ($1,
                    $2,$3,
                    $4, $5, $6,
                    $7, $8) RETURNING *;

  `, [owner_id, title, city, lat, long, zoom, created_on, modified_on])
    .then((response) => {
      return response.rows;
    });
};

const insertAuthorization = (map_id, email) => {
  return db.query(`INSERT INTO authorizations (user_id, map_id)
                    SELECT users.id, $1 as map_id
                    FROM users
                    WHERE users.email = $2
                    RETURNING *;
  `, [map_id, email])
    .then( response => {
      return response.rows[0];
    })
}



module.exports = {
  getMaps,
  getMapById,
  getAuthorizedUsersByMap,
  insertMap,
  insertAuthorization
};
