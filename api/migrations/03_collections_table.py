# steps = [
#     [
#         # "Up" SQL statement
#         """
#         CREATE TABLE collections (
#             id SERIAL PRIMARY KEY NOT NULL,
#             username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username),


#         );
#         """,
#         # "Down" SQL statement
#         """
#         DROP TABLE collections;
#         """
#     ]
# ]

steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE movie_collection (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username),
            collection_name VARCHAR(500) NOT NULL 
        );

        CREATE TABLE movies (
            movie_id VARCHAR(500) PRIMARY KEY NOT NULL,
            movie_title VARCHAR(500) UNIQUE NOT NULL
        );

        CREATE TABLE movies_in_collections (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username),
            collection_id INTEGER REFERENCES movie_collection(id), 
            movie_id VARCHAR(500) UNIQUE NOT NULL REFERENCES movies(movie_id)
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
