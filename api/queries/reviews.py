from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class MovieReviewIn(BaseModel):
    review: str
    rating: float
    username: str
    movie_id: int


class MovieReviewOut(BaseModel):
    id: int
    username: str
    movie_id: int
    review: str
    rating: float


class MovieReviewRepo:
    def add_review(self, username: str, movie_id: int, review: str, rating: float) -> MovieReviewOut: # noqa
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO reviews
                        (
                        username,
                        movie_id,
                        review,
                        rating
                        )
                    VALUES
                    (%s, %s, %s, %s)
                    RETURNING id, username, movie_id, review, rating
                    """,
                    [
                        username,
                        movie_id,
                        review,
                        rating
                    ]
                )
                rev = result.fetchone()
                review = MovieReviewOut(
                    id=rev[0],
                    username=rev[1],
                    movie_id=rev[2],
                    review=rev[3],
                    rating=rev[4]
                )
                return review

    def get_reviews(self, movie_id: int) -> list[MovieReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, movie_id, review, rating
                    FROM reviews
                    WHERE movie_id = %s
                    """,
                    [movie_id]
                )
                reviews = db.fetchall()
                return [MovieReviewOut(
                    id=review[0],
                    username=review[1],
                    movie_id=review[2],
                    review=review[3],
                    rating=review[4]
                ) for review in reviews]

    def get_all_reviews(self) -> list[MovieReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, movie_id, review, rating
                    FROM reviews
                    """
                )
                reviews = db.fetchall()
                return [MovieReviewOut(
                    id=review[0],
                    username=review[1],
                    movie_id=review[2],
                    review=review[3],
                    rating=review[4]
                ) for review in reviews]

    def get_reviews_by_user(self, username: str) -> list[MovieReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, movie_id, review, rating
                    FROM reviews
                    WHERE username = %s
                    """,
                    [username]
                )
                reviews = db.fetchall()
                return [MovieReviewOut(
                    id=review[0],
                    username=review[1],
                    movie_id=review[2],
                    review=review[3],
                    rating=review[4]
                ) for review in reviews]

    def get_reviews_by_movie(self, movie_id: int) -> list[MovieReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, movie_id, review, rating
                    FROM reviews
                    WHERE movie_id = %s
                    """,
                    [movie_id]
                )
                reviews = db.fetchall()
                return [MovieReviewOut(
                    id=review[0],
                    username=review[1],
                    movie_id=review[2],
                    review=review[3],
                    rating=review[4]
                ) for review in reviews]

    def delete_review(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM reviews
                    WHERE id = %s
                    """,
                    [id]
                )
                if db.rowcount > 0:
                    return True
                else:
                    return False

    def update_review(self, id: int, review: MovieReviewIn) -> MovieReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE reviews
                    SET
                    review = %s,
                    rating = %s
                    WHERE id = %s
                    RETURNING id, username, movie_id, review, rating
                    """,
                    [
                        review.review,
                        review.rating,
                        id
                    ]
                )
                rev = result.fetchone()
                review = MovieReviewOut(
                    id=rev[0],
                    username=rev[1],
                    movie_id=rev[2],
                    review=rev[3],
                    rating=rev[4]
                )
                return review
