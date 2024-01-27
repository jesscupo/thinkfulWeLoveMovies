const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
  }

  const list = async (req, res, next) => {
    if (req.query) {
      req.query.is_showing === "true" &&
        res.json({ data: await service.listMoviesShowing() });
    }
    res.json({ data: await service.list() });
  };

async function read(req, res, next) {
    const { movie } = res.locals;
    res.json({ data: movie });
}

async function readMovieTheaters(req, res, next) {
    const movie_id = res.locals.movie.movie_id;
    const result = await service.readMovieTheaters(movie_id)
    res.json({data: result})
}

async function readMovieReviews(req, res, next) {
    const movie_id = res.locals.movie.movie_id;
    const result = await service.readMovieReviews(movie_id)
    res.json({data: result})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    readMovieTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovieTheaters)],
    readMovieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovieReviews)]
  };
  