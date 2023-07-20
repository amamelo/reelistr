from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message:str

class MovieIn(BaseModel):
    tmdb_movie_id: int

class MovieOut(BaseModel):
    id: int
    tmdb_movie_id: int


class MovieRepository:
    def add_movie_to_db(self, movie: MovieIn) -> MovieOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO movies
                    (tmdb_movie_id)
                    VALUES
                    (%s)
                    RETURNING id, tmdb_movie_id
                    """,
                    [
                    movie.tmdb_movie_id
                    ]
                )
                mov = result.fetchone()
                movie = MovieOut(
                    id= mov[0],
                    tmdb_movie_id = mov[1]
                )
                return movie


    def get_movie_from_db(self, id:int) -> Optional[MovieOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    id, tmdb_movie_id
                    FROM
                    movies
                    WHERE id= %s
                    """,
                    [id]
                )
                mov = result.fetchone()
                movie= MovieOut(
                    id = mov[0],
                    tmdb_movie_id = mov[1]
                )
                return movie


    def get_all_movies_db(self) -> Optional[MovieOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    *
                    FROM movies
                    """,
                )
                movies = []
                for mov in result.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = mov[i]
                    movies.append(record)
                return movies
    def delete(self, id:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM movies
                        WHERE id = %s
                        """,
                        [id]
                    )
                    if db.rowcount > 0:
                        return True
                    else:
                        return False
        except Exception as e:
            print(e)
            return False
