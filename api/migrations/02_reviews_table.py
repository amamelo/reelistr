steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username),
            rating INTEGER NOT NULL,
            review VARCHAR(500),
            movie_id INTEGER NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reviews;
        """
    ]
]
