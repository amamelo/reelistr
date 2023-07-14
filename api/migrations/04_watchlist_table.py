steps = [

    """
    CREATE TABLE watchlist (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username),
        movie_id INTEGER NOT NULL REFERENCES movies(tmdb_movie_id)
    );
    """,
    """
    DROP TABLE watchlist;

    """

]
