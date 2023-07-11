steps = [

    """
    CREATE TABLE watchlist (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username),
        movie_id INTEGER NOT NULL
    );
    """,
    """
    DROP TABLE watchlist;

    """

]
