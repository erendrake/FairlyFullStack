const express = require('express');
const expressListRoutes = require('express-list-routes');

const hotDogHunt = require('./hotDogHunt');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ routes: expressListRoutes(router) });
});

router.use('/hotDogHunt', hotDogHunt);

module.exports = router;
