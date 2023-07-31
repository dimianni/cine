import mongoose, { Schema, model, models } from "mongoose";

// Define sub-schema for "awards"
const awardsSchema = new Schema({
    wins: Number,
    nominations: Number,
    text: String,
});

// Define sub-schema for "imdb"
const imdbSchema = new Schema({
    rating: Number,
    votes: Number,
    id: Number,
});

// Define sub-schema for "tomatoes"
const tomatoesSchema = new Schema({
    website: String,
    viewer: {
        rating: Number,
        numReviews: Number,
        meter: Number,
    },
    dvd: Date,
    critic: {
        rating: Number,
        numReviews: Number,
        meter: Number,
    },
    boxOffice: String,
    consensus: String,
    rotten: Number,
    production: String,
    lastUpdated: Date,
    fresh: Number,
});

// Define the Mongoose schema for the "movies" collection
const movieSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    plot: String,
    genres: [String],
    runtime: Number,
    metacritic: Number,
    rated: String,
    cast: [String],
    poster: String,
    title: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    writers: [String],
    awards: awardsSchema, // Sub-schema "awards"
    lastupdated: Date,
    year: Number,
    imdb: imdbSchema, // Sub-schema "imdb"
    countries: [String],
    type: String,
    tomatoes: tomatoesSchema, // Sub-schema "tomatoes"
    num_mflix_comments: Number,
});

const Movie = models?.Movie || model('Movie', movieSchema);

export default Movie;