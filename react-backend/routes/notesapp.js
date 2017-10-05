var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  res.json([{
	  	date: 1507238885,
		id: 1,
		isDaily: true,
		title: "today note",
		desc: "this is what to do"
	}, 
	{
		date: 1507325282,
		id: 2,
		isDaily: true,
		title: "tomorrow notes",
		desc: "this is what to do"
	},
	{
		date: 1507325282,
		id: 3,
		isDaily: true,
		title: "another one",
		desc: "this is what to do"
  }]);
});

router.get('/date', function(req, res, next) {
	res.json({
		date: "Thu Oct 5 2017"
  })
  });

module.exports = router;