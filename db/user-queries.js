const { response } = require('express');
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
  return db.query(`SELECT u1.id as user_id, maps.*, u2.first_name as owner_first, u2.last_name as owner_last, u2.profile_pic_url as owner_pic
                    FROM favorites
                    JOIN users u1 ON favorites.user_id = u1.id
                    JOIN maps ON favorites.map_id = maps.id
                    JOIN users u2 ON u2.id = maps.owner_id
                    WHERE u1.id = $1;
  `, [user_id])
    .then((response) => {
      return response.rows;
    })
}

const userFavoriteIDs = (arr) => {
  const ids = [];
  for (const element of arr) {
    ids.push(element.id);
  }
  return ids;
}

const getAuthorizedMapsByUser = (user_id) => {
  return db.query(`SELECT maps.*, u2.first_name as owner_first, u2.last_name as owner_last, u2.profile_pic_url as owner_pic
                    FROM users u1
                    JOIN authorizations ON u1.id = authorizations.user_id
                    JOIN maps ON maps.id = authorizations.map_id
                    JOIN users u2 ON u2.id = maps.owner_id
                    WHERE u1.id = $1;
  `, [user_id])
    .then((response) => {
      return response.rows;
    });
};

const removeAuthorization = (user_id, map_id) => {
  return db.query(`DELETE FROM authorizations
                  WHERE user_id = $1
                  AND map_id = $2
                  RETURNING *;
  `, [user_id, map_id])
    .then( response => {
      return response.rows;
    });
};

module.exports = {
  getUsers,
  getUserById,
  getMapsByOwner,
  getFavoritesFromUser,
  userFavoriteIDs,
  getAuthorizedMapsByUser,
  removeAuthorization
};
