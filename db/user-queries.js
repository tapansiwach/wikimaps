const db = require('./db');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((response) => {
      return response.rows;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
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

const getFavoritesFromUser = (user_id) => {
  return db.query(`SELECT users.id as user_id, maps.*
                    FROM favorites
                    JOIN users ON favorites.user_id = users.id
                    JOIN maps ON favorites.map_id = maps.id
                    WHERE users.id = $1;
  `, [user_id])
    .then((response) => {
      return response.rows;
    })
}

const getAuthorizedMapsByUser = (user_id) => {
  return db.query(`SELECT maps.*
                    FROM users
                    JOIN authorizations ON users.id = authorizations.user_id
                    JOIN maps ON maps.id = authorizations.map_id
                    WHERE users.id = $1;
  `, [user_id])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getUsers,
  getUserById,
  getMapsByOwner,
  getFavoritesFromUser,
  getAuthorizedMapsByUser
};
