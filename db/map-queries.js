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

const getMapsByOwner = (owner_id) => {
  return db.query(`SELECT *
                    FROM maps
                    JOIN users
                    ON owner_id = users.id
                    WHERE users.id = $1;
  `, [owner_id])
  .then((response) => {
    return response.rows;
  });
};

const getAuthorizedMapsByUser = (user_id) => {
  return db.query(`SELECT maps.*
                    FROM users
                    JOIN authorizations ON users.id = authorizations.user_id
                    JOIN maps ON maps.id = authorizations.map_id
                    WHERE users.id = 3;
  `, [user_id])
  .then((response) => {
    return response.rows;
  });
};

module.exports = {
  getMaps,
  getMapById,
  getMapsByOwner,
  getAuthorizedMapsByUser
};
