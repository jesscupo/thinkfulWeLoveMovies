const knex = require("../api/db/connection");
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
   critic_id: "critic.category_id",
   preferred_name: "critic.preferred_name",
   surname: "critic.surname",
   organization_name: "critic.organization_name",
   created_at: "critic.created_at",
   updated_at: "critic.updated_at",
 });


function list() {
  return knex("movies").select("*");
}

function listMoviesShowing() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .distinct("movies.*")
    .where({is_showing: true});
}

function read(movie_id) {
    return knex("movies")
            .select("*")
            .where({movie_id:movie_id})
            .first();
}

function readMovieTheaters(movie_id) {
    return knex("theaters")
            .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
            .where({movie_id:movie_id, is_showing: true})
}

function readMovieReviews(movie_id) {
    return knex("reviews")
            .join("critics", "critics.critic_id", "reviews.critic_id")
            .where({movie_id:movie_id, })
            .then((results) => results.map(result => addCritic(result)));
}


module.exports = {
    list,
    listMoviesShowing,
    read,
    readMovieTheaters,
    readMovieReviews,
  };
  