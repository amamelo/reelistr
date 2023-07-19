steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL REFERENCES accounts(username),
            rating FLOAT NOT NULL,
            review VARCHAR(500),
            movie_id INTEGER NOT NULL REFERENCES movies(tmdb_movie_id),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reviews;
        """
    ]
]
