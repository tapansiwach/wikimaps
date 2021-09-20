const express = require('express');
const router = express.Router();
const pinQueries = require('../db/pin-queries');

// GET /pins/pin/:pin_id
router.get('/pin/:pin_id', (req, res) => {
  pinQueries.getPin(req.params.pin_id)
    .then((pin) => {
      res.json(pin);
    });
});

// GET /pins/map/:map_id
router.get('/map/:map_id', (req, res) => {
  pinQueries.getMapById(req.params.map_id)
    .then((pins) => {
      res.json(pins);
    });
});

// GET /pins/
router.get('/', (req, res) => {
  pinQueries.getPins()
    .then((pins) => {
      // res.render();
      res.json(pins);
    });
});

module.exports = router;
