steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            hashed_password VARCHAR(500)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]