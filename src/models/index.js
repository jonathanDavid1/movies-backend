const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//Table pivot moviesActors
Movie.belongsToMany(Actor, {through: 'movieActor'});
Actor.belongsToMany(Movie, {through: 'movieActor'});

//Table pivot moviesDirectors
Movie.belongsToMany(Director, {through: 'movieDirector'});
Director.belongsToMany(Movie, {through: 'movieDirector'});

//Table pivot moviesGenres
Movie.belongsToMany(Genre, {through: 'movieGenre'});
Genre.belongsToMany(Movie, {through: 'movieGenre'});






