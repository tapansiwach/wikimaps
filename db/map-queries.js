const db = require('./db');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
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
    })
}

module.exports = {
  getMaps,
  getMapById,
  getAuthorizedUsersByMap
};
