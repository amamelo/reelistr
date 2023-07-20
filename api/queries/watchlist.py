from pydantic import BaseModel
from typing import List
from queries.pool import pool
from fastapi import Response

class Error(BaseModel):
    message: str

class MovieWatchlistIn(BaseModel):
    id: int

class MovieWatchlistOut(BaseModel):
    id: int
    # username: str
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
                        # username= film[2],
                        movie_id= film[2],
                        watched= film[3]
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

#add method to get watchlist by account username

    def get_watchlist_by_username(self, username:str) -> List[MoviesWatchlistUserOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM watchlists
                    WHERE username = %s
                    """,
                    [username]
                )
                watch = result.fetchone()
                watchlist = MoviesWatchlistUserOut(
                    id= watch[0],
                    username= watch[1]
                )
                return watchlist

    def add_to_watchlist(self, username: str, watchlist_id: int, movie_id: int, watched: bool) -> MovieWatchlistOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO movies_to_watchlist
                        (

                        watchlist_id,
                        movie_id,
                        watched
                        )
                    VALUES
                    (%s, %s, %s)
                    RETURNING id, watchlist_id, movie_id, watched
                    """,
                    [
                    watchlist_id,
                    movie_id,
                    watched
                    ]
                )
                watch = result.fetchone()
                watchlist = MovieWatchlistOut(
                    id= watch[0],
                    # username= watch[1],
                    watchlist_id= watch[1],
                    movie_id= watch[2],
                    watched= watch[3]
                )
                return watchlist


    def delete_from_watchlist(self, username: str, watchlist_id: int, movie_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM movies_to_watchlist
                    WHERE
                    watchlist_id = %s
                    AND
                    movie_id = %s
                    """,
                    [
                    watchlist_id,
                    movie_id
                    ]
                )
                if db.rowcount > 0:
                    return True
                else:
                    return False
