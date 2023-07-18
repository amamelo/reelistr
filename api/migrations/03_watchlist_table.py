steps = [
     [
         """
         CREATE TABLE watchlists (
             id SERIAL PRIMARY KEY NOT NULL,
             username VARCHAR(50) NOT NULL REFERENCES accounts(username)
         );

        CREATE TABLE movies_to_watchlist (
            id SERIAL PRIMARY KEY NOT NULL,
            watchlist_id INTEGER NOT NULL REFERENCES watchlists(id),
            username VARCHAR(50) NOT NULL REFERENCES accounts(username),
            movie_id INTEGER REFERENCES movies(tmdb_movie_id),
            watched BOOLEAN DEFAULT FALSE
        );
         """,
         """
         DROP TABLE watchlists;

         DROP TABLE movies_to_watchlist;

         """
     ]
]
