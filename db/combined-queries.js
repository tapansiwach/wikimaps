const db = require("./db");

// return maps created by a user along with the collaborators
const getMyMaps = async (owner_id) => {

  // get the maps created by with a user
  const userMaps = await db.query(`
  SELECT * FROM maps WHERE owner_id = $1;
`, [owner_id]);

  // for each map
  for (const map of userMaps.rows) {
    // get the collaborators for that map
    const collaborators = await db.query(`
    SELECT users.first_name, users.last_name, users.id, maps.title, maps.city, maps.created_on
    FROM maps
      JOIN authorizations ON maps.id = authorizations.map_id
      JOIN users ON authorizations.user_id = users.id
    WHERE maps.id = $1;
    `, [map.id]);
    console.log(`collaborators for map id ${map.id} are`, collaborators.rows);

    // modify the map object to include the list of collaborators
    map.collaborators = collaborators.rows;
  };

  return userMaps.rows;
};


module.exports = { getMyMaps };
