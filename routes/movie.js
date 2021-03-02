var express = require('express');
var router = express.Router();
const movieDetails = require('../data/movieDetails');

function requireJSON(req, res, next) {
	if (!req.is('application/json')) {
		res.json({ msg: 'Content type must be application/json' });
	} else {
		next();
	}
}
/* GET movie page. */
router.param('movieId', (req, res, next) => {
	//update the db with analytics data
	console.log('Someone hit a route that used the movieId wildcard');
	next();
});

// GET /movie/top_rated
router.get('/top_rated', (req, res, next) => {
	let page = req.query.page;
	if (!page) {
		page = 1;
	}
	let results = movieDetails.sort((a, b) => {
		return b.vote_average - a.vote_average;
	});
	const indexToStart = (page - 1) * 20;
	results = results.slice(indexToStart, indexToStart + 19);
	res.json(results);
});

/* GET /movie/movieId */
router.get('/:movieId', (req, res, next) => {
	const movieId = req.params.movieId;
	const results = movieDetails.find((movie) => movie.id === Number(movieId));
	if (!results) {
		res.json({
			msg: 'Movie ID is not found',
			production_companies: [],
		});
	} else {
		res.json(results);
	}
});

// POST /movie/{movie_id}/rating
router.post('/:movieId/rating', requireJSON, (req, res, next) => {
	const movieId = req.params.movieId;
	const userRating = req.body.value;
	if (userRating < 0.5 || userRating > 10) {
		res.json({ msg: 'Rating must be between .5 and 10' });
	} else {
		res.json({
			msg: ' thank you for submitting your rating',
			status_code: 200,
		});
	}
});

// DELETE /movie/{movie_id}/rating
router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
	res.json({ msg: 'Rating deleted' });
});

module.exports = router;
