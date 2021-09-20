const express = require('express');
const router = express.Router();
const mapQueries = require('../db/map-queries');

// GET/maps/:map_id/authorized-users
router.get('/:map_id/authorized-users', (req, res) => {
  mapQueries.getAuthorizedUsersByMap(req.params.map_id)
    .then((users) => {
      res.json(users);
    });
});

// GET /maps/:map_id
router.get('/:map_id', (req, res) => {
  mapQueries.getMapById(req.params.map_id)
    .then((map) => {
      res.json(map);
    });
});

// GET /maps/
router.get('/', (req, res) => {
  mapQueries.getMaps()
    .then((maps) => {
      // res.render();
      res.json(maps);
    });
});

module.exports = router;
