var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  res.json([{
	  	date: 1507401600,
		id: 1,
		isDaily: true,
		title: "today note",
		desc: "this is what to do"
	}, 
	{
		date: 1507456861,
		id: 2,
		isDaily: true,
		title: "tomorrow notes",
		desc: "this is what to do"
	},
	{
		date: 1506456861,
		id: 2,
		isDaily: true,
		title: "olllllddddd note",
		desc: "this is what to do"
	},
	{
		date: 1507456861,
		id: 3,
		isDaily: true,
		title: "another one",
		desc: "this is what to do"
  }]);
});

router.post('/new', function(req, res, next) {
	//Add new note
});

module.exports = router;