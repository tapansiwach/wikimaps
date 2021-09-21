// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const userQueries = require('./db/user-queries')
const mapQueries = require("./db/map-queries")
const combinedQueries = require("./db/combined-queries")


// PG database client/connection setup
const db = require('./db/db');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const mapRouter = require('./routes/map-router');
const pinRouter = require('./routes/pin-router');
const userRouter = require('./routes/user-router');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db)); // TODO remove this if our routes work.
app.use("/api/widgets", widgetsRoutes(db)); // TODO remove this if our routes work.
app.use('/maps', mapRouter);
app.use('/pins', pinRouter);
app.use('/users', userRouter);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/my-maps", (req, res) => {
  combinedQueries.getMyMaps(1)
    .then(maps => {
      console.log(maps);
      res.render('my-maps', { maps })
    });
});

app.get("/create-map", (req, res) => {
  res.render("create-map");
});

app.get("/:map_id", (req, res) => {
  mapQueries.getMapById(req.params.map_id)
    .then((map) => {
      // res.json(map);
      const key = process.env.MAP_API_KEY;
      res.render('view-map', { map, key });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
