var express = require('express');
var router = express.Router();

router.get('/notes', function(req, res, next) {
	var db = req.db;
	db.collection("Lions").find().toArray((err, result) => {
		if (err) {
			console.log(err);
		}
		console.log(result)
		res.json(result);
	})
});

//Add a new note to databse
router.post('/new', function(req, res, next) {
	var db = req.db;
	console.log(req.body)
	db.collection("Lions").save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to database')
	  })
});

module.exports = router;