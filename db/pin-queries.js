const db = require('./db');

// Just here for development purposes
const getPins = () => {
  return db.query('SELECT * FROM pins;')
    .then((response) => {
      return response.rows;
    });
};

const getPin = (id) => {
  return db.query('SELECT * FROM pins WHERE pins.id = $1;', [id])
    .then((response) => {
      return response.rows[0];
    });
};

const getPinsByMap = (map_id) => {
  return db.query(`SELECT pins.*, maps.title as map_title FROM pins
                    JOIN maps ON pins.map_id = maps.id
                    JOIN users ON users.id = pins.user_id
                    WHERE maps.id = $1;
  `, [map_id])
    .then((response) => {
      return response.rows;
    })
}

module.exports = {
  getPins,
  getPin,
  getPinsByMap
};