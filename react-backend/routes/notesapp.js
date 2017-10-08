var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  res.json([{
	  	date: 1507401600,
		id: 1,
		isDaily: false,
		title: "today note",
		desc: "this is what to do"
	},
	{
	  date: 0,
	  id: 2,
	  isDaily: true,
	  title: "daily note",
	  desc: "do this every day"
  	}, 
	{
		date: 1507456861,
		id: 3,
		isDaily: false,
		title: "tomorrow notes",
		desc: "this is what to do"
	},
	{
		date: 1506456861,
		id: 4,
		isDaily: false,
		title: "olllllddddd note",
		desc: "this is what to do"
	},
	{
		date: 1507456861,
		id: 5,
		isDaily: false,
		title: "another one",
		desc: "this is what to do"
  }]);
});

router.post('/new', function(req, res, next) {
	//Add new note
});

module.exports = router;