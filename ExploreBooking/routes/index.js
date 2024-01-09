// File name: index.js
// Web App name: explorebooking

var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');

/* GET home page. */
router.get('/', controlerIndex.home);

// Route for filter by region
router.get('/filterByRegion/:region', controlerIndex.filterByRegion);

module.exports = router;
