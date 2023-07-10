steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE collections (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL REFERENCES accounts(username),
            collection_name VARCHAR(500)
            movie_title VARCHAR(500) UNIQUE NOT NULL,

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE collections;
        """
    ]
]
