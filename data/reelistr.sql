DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS reviews;

CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    referrer_id INTEGER REFERENCES users('id') ON DELETE CASCADE
)

CREATE TABLE movies (
    id SERIAL NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL check(
        category = 'Action'
        or category = 'Horror'
        or category = 'Romance'
        or category = 'Comedy'
        or category = 'Romantic Comedy'
    ),
    owner_id INTEGER NOT NULL REFERENCES users('id') ON DELETE CASCADE
)

CREATE TABLE reviews (
    id SERIAL NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    reviewer_id INTEGER REFERENCES users('id') ON DELETE CASCADE,
    rating BOOLEAN NOT NULL check(rating = true or rating = false),
    movie_id INTEGER NOT NULL REFERENCES movie
)