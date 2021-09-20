const express = require('express');
const router = express.Router();
const mapQueries = require('../db/map-queries');

// GET /maps/
router.get('/', (req, res) => {
  mapQueries.getMaps()
    .then((maps) => {
      // res.render();
      res.json(maps);
    });
});

// GET /maps/:map_id
router.get('/:map_id', (req, res) => {
  mapQueries.getMapById(req.params.map_id)
    .then((map) => {
      res.json(map);
    });
});

module.exports = router;
