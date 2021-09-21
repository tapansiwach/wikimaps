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
      // res.json(map);
      res.render('view-map', { map });
    });
});

// GET /maps/
router.get('/', (req, res) => {
  mapQueries.getMaps()
    .then((maps) => {
      // res.json(maps);
      res.render('all-maps', { maps });
    });
});

// POST /maps/
router.post('/', (req, res) => {
  const {owner_id, title, city, lat, long, zoom, created_on, modified_on} = req.body;
  mapQueries.insertMap(owner_id, title, city, lat, long, zoom, created_on, modified_on)
    .then((map) => {
      res.json(map);
    });
});

module.exports = router;
