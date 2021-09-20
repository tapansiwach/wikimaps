const express = require('express');
const router = express.Router();
const userQueries = require('../db/user-queries');

// This is here just for development purposes, to be
// removed so as to not allow user DB access to anybody.
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then((users) => {
      // res.render();
      res.json(users);
    });
});

router.get('/:user_id', (req, res) => {
  userQueries.getUserById(req.params.user_id)
    .then( user => {
      res.json(user);
    });
});
