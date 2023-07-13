# steps = [
#     [
#         # "Up" SQL statement
#         """
#         CREATE TABLE collections (
#             id SERIAL PRIMARY KEY NOT NULL,
#             username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username), # noqa: E501


#         );
#         """,
#         # "Down" SQL statement
#         """
#         DROP TABLE collections;
#         """
        # CREATE TABLE movies (
        #     movie_id INTEGER PRIMARY KEY NOT NULL,
        #     movie_title VARCHAR(500) UNIQUE NOT NULL
        #     poster_path VARCHAR(500)
        # );
#     ]
# ]

steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE movie_collection (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL REFERENCES accounts(username),
            collection_name VARCHAR(500) NOT NULL
        );

        CREATE TABLE movies (
            id SERIAL PRIMARY KEY NOT NULL,
            tmdb_movie_id INTEGER UNIQUE NOT NULL
        );

        CREATE TABLE movies_in_collections (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL REFERENCES accounts(username),
            collection_id INTEGER REFERENCES movie_collection(id),
            movie_id INTEGER UNIQUE NOT NULL REFERENCES movies(tmdb_movie_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE movie_collection;

        DROP TABLE movies;

        DROP TABLE movies_in_collections;
        """
    ]
]
