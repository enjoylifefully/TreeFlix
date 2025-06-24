/**
 * @typedef {Object} Movie
 * @property {string} title - The title of the movie or series.
 * @property {number} year - The release year.
 * @property {string[]} genre - A list of genres (e.g., ["Action", "Drama"]).
 * @property {string} director - The name of the director or directors.
 * @property {number} rating - The numeric rating (e.g., 8.5).
 */

const MOVIES = [
    {
        title: "The Dark Knight",
        year: 2008,
        genre: ["Action", "Drama"],
        director: "Christopher Nolan",
        rating: 9.0,
    },
    {
        title: "Inception",
        year: 2010,
        genre: ["Sci-Fi", "Thriller"],
        director: "Christopher Nolan",
        rating: 8.8,
    },
    {
        title: "Breaking Bad",
        year: 2008,
        genre: ["Drama", "Crime", "Thriller"],
        director: "Vince Gilligan",
        rating: 9.5,
    },
    {
        title: "The Matrix",
        year: 1999,
        genre: ["Sci-Fi", "Action"],
        director: "Lana Wachowski, Lilly Wachowski",
        rating: 8.7,
    },
];
