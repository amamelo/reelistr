from pydantic import BaseModel
from typing import List
from queries.pool import pool

class Error(BaseModel):
    message: str

class MovieWatchlistIn(BaseModel):
    id: int

class MovieWatchlistOut(BaseModel):
    id: int
    username: str
    watchlist_id: int
    movie_id: int
    watched: bool

class MoviesWatchlistUserOut(BaseModel):
    id: int
    username: str


class MovieWatchlistRepo:
    def create_watchlist(self, username: str) -> MoviesWatchlistUserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO watchlists
                        (
                        username
                        )
                    VALUES
                    (%s)
                    RETURNING id, username
                    """,
                    [
                    username
                    ]
                )
                watch = result.fetchone()
                watchlist = MoviesWatchlistUserOut(
                    id= watch[0],
                    username= watch[1]
                )
                return watchlist


    def get_watchlist_details(self, username: str, watchlist_id: int) -> List[MovieWatchlistOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM movies_to_watchlist
                    """,
                )
                movies = []
                for film in result:
                    movie = MovieWatchlistOut(
                        id= film[0],
                        watchlist_id= film[1],
                        username= film[2],
                        movie_id= film[3],
                        watched= film[4]
                    )
                    movies.append(movie)
                return movies


    def get_all_watchlists(self) -> MoviesWatchlistUserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM watchlists
                    """
                )
                watchlists = []
                for watch in result:
                    watchlist = MoviesWatchlistUserOut(
                        id= watch[0],
                        username= watch[1],
                    )
                    watchlists.append(watchlist)
                return watchlists


    def add_to_watchlist(self, username: str, watchlist_id: int, movie_id: int, watched: bool) -> MovieWatchlistOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO movies_to_watchlist
                        (
                        username,
                        watchlist_id,
                        movie_id,
                        watched
                        )
                    VALUES
                    (%s, %s, %s, %s)
                    RETURNING id, username, watchlist_id, movie_id, watched
                    """,
                    [
                    username,
                    watchlist_id,
                    movie_id,
                    watched
                    ]
                )
                watch = result.fetchone()
                watchlist = MovieWatchlistOut(
                    id= watch[0],
                    username= watch[1],
                    watchlist_id= watch[2],
                    movie_id= watch[3],
                    watched= watch[4]
                )
                return watchlist


    def delete_from_watchlist(self, username: str, watchlist_id: int, movie_id: int) -> MovieWatchlistOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM movies_to_watchlist
                    WHERE
                    username = %s
                    AND
                    watchlist_id = %s
                    AND
                    movie_id = %s
                    """,
                    [
                    username,
                    watchlist_id,
                    movie_id
                    ]
                )
                if db.rowcount > 0:
                    return True
                else:
                    return False
