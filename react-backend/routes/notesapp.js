var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  res.json([{
		id: 1,
		isDaily: true,
		title: "the Title",
		desc: "this is what to do"
	}, 
	{
		id: 2,
		isDaily: true,
		title: "the Title",
		desc: "this is what to do"
	},
	{
		id: 3,
		isDaily: true,
		title: "the Title",
		desc: "this is what to do"
  }]);
});

module.exports = router;