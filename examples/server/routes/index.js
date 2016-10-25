var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  logger.trace(req, res, 'TRACE DEMO1');
});

module.exports = router;
