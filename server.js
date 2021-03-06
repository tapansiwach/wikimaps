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
const pinQueries = require("./db/pin-queries")
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
      // console.log(maps);
      // This is a little ugly again, but gets us the full functionality
      // on a single page load by preloading all the different queries
      // we will require.
      userQueries.getAuthorizedMapsByUser(1)
        .then(authMaps => {
          // This is getting out of hand. Now there are three of them.
          // Promises were supposed to fix callback hell, not join them!
          // Maybe we should refactor this to using async / await instead?
          userQueries.getFavoritesFromUser(1)
            .then(favorites => {
              const faveIds = userQueries.userFavoriteIDs(favorites);
              res.render('my-maps', { maps, authMaps, favorites, faveIds })
            })
        })
    });
});

app.post("/new-authorization", (req, res) => {
  console.log('req.body has value:', req.body);
  const { email, map_id } = req.body;
  // console.log(`\n\n query here: SELECT ... with email ${email} and map_id ${map_id}\n\n`);
  mapQueries.insertAuthorization(map_id, email)
    .then(newAuth => {
      console.log(`Added to authorizations DB: ${newAuth}`);
      res.redirect('/my-maps');
    })
});

app.post('/remove-authorization', (req, res) => {
  console.log('req.body is: ', req.body);
  const {map_id} = req.body;
  console.log('This is where we remove authorization by removing user form table.');
  userQueries.removeAuthorization(1, map_id)
    .then(deleted => {
      console.log("Deleted this map authorization: ",deleted);
      res.redirect('/my-maps#my-collabs');
    });
});

app.get("/some-temp", (req, res) => {
  res.render('temp-modal');
})

app.get("/create-map", (req, res) => {
  res.render("create-map");
});

app.get("/profile", (req, res) => {
  userQueries.getUserById(1)
    .then(user => {
      console.log(user);
      res.render("profile", { user });
    })
});

app.get("/test-map:map_id", (req, res) => {
  combinedQueries.getMapWithPins(req.params.map_id)
    .then(map => {
      const key = process.env.MAP_API_KEY;
      console.log("map being passed to the template:", map);
      res.render('map-without-iframe/test-map-original', { map, key });
    });
});

app.post("/new-pin", (req, res) => {
  console.log(req.body);
  // res.json(req.body);
  pinQueries.addPin(req.body)
  .then(result => {
    console.log(`Added new pin with data: ${result}`);
    res.redirect(`/test-map${result.map_id}`)
    });
});

// app.get("/:map_id", (req, res) => {
//   mapQueries.getMapById(req.params.map_id)
//     .then((map) => {
//       // res.json(map);
//       const key = process.env.MAP_API_KEY;
//       res.render('view-map', { map, key });
//     });
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
