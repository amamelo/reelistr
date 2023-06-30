steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL,
            hashed_password VARCHAR(500)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]