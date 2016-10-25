var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:uid/balance', function(req, res, next) {
	try {
		var body = req.body;
		logger.debug(body);
	  res.send({msg: `Your balance is ${body.user.property.balance}`});
	}
	catch(e) {
		logger.error(e);
		res.send({err: e.message });
	}

  logger.trace(req, res, 'TRACE DEMO2');
});

module.exports = router;
