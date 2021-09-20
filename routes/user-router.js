const express = require('express');
const router = express.Router();
const userQueries = require('../db/user-queries');

// GET /users/:user_id/authorizations
router.get('/:user_id/authorizations', (req, res) => {
  userQueries.getAuthorizedMapsByUser(req.params.user_id)
    .then(maps => {
      res.json(maps);
    });
});

// GET /users/:user_id/favorites
router.get('/:user_id/favorites', (req, res) => {
  userQueries.getFavoritesFromUser(req.params.user_id)
    .then(favorites => {
      res.json(favorites);
    });
});

// GET /users/:user_id/maps
router.get('/:user_id/maps', (req, res) => {
  userQueries.getMapsByOwner(req.params.user_id)
    .then(maps => {
      res.json(maps);
    });
});

// GET /users/:user_id
router.get('/:user_id', (req, res) => {
  userQueries.getUserById(req.params.user_id)
    .then( user => {
      res.json(user);
    });
});

// This is here just for development purposes, to be
// removed so as to not allow user DB access to anybody.
// GET /users/
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then((users) => {
      // res.render();
      res.json(users);
    });
});

module.exports = router;
