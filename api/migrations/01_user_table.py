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
        # Seed
        # """
        # INSERT INTO accounts (id, email, username) VALUES ('1', 'luke', 'luke@email.com')
        # """
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]