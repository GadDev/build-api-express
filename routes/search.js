var express = require('express');
var router = express.Router();
const movies = require('../data/movies');
const people = require('../data/people');
function queryRequired(req, res, next) {
	const searchTerm = req.query.query;
	if (!searchTerm) {
		res.json({ msg: 'Query is Required' });
	} else {
		next();
	}
}

router.use(queryRequired);

// GET /search/movie
router.get('/movie', (req, res, next) => {
	const searchTerm = req.query.query;
	const results = movies.filter((movie) => {
		let found = false;
		found =
			movie.overview.includes(searchTerm) ||
			movie.title.includes(searchTerm);
		return found;
	});
	if (!results.length) {
		res.json('No results for this query');
	} else {
		res.json({ results });
	}
});

// GET /search/person
router.get('/person', (req, res, next) => {
	const searchTerm = req.query.query;
	const results = people.filter((person) => {
		let found = false;
		found = person.name.includes(searchTerm);
		return found;
	});
	if (!results.length) {
		res.json('No results for this query');
	} else {
		res.json({ results });
	}
});
module.exports = router;
