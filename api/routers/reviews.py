from fastapi import Depends, APIRouter
from typing import List
from queries.reviews import MovieReviewRepo, MovieReviewIn, MovieReviewOut, Error
from routers.authenticator import authenticator

router = APIRouter()

# refactor POST requests to only have request body & no query parameters

@router.get("/reviews", response_model=List[MovieReviewOut])
def get_all_reviews():
    repo = MovieReviewRepo()
    result = repo.get_all_reviews()
    return result

@router.post("/reviews", response_model=MovieReviewOut | Error)
def add_review(
    review: MovieReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repo = MovieReviewRepo()
    try:
        result = repo.add_review(review.username, review.movie_id, review.review, review.rating)
        print(result)
        return result
    except Exception as e:
        return Error(message=str(e))

@router.get("/reviews/user/{username}", response_model=List[MovieReviewOut])
def get_reviews_by_user(
    username: str
):
    repo = MovieReviewRepo()
    result = repo.get_reviews_by_user(username)
    return result

@router.get("/reviews/movie/{movie_id}", response_model=List[MovieReviewOut])
def get_reviews_by_movie(
    movie_id: int
):
    repo = MovieReviewRepo()
    result = repo.get_reviews_by_movie(movie_id)
    return result

@router.delete("/reviews/{id}", response_model=bool)
def delete_review(
    id: int,
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    repo = MovieReviewRepo(),
    result = repo.delete_review(id)
    return result

@router.put("/reviews/{id}", response_model=MovieReviewOut | Error)
def update_review(
    id: int,
    review: MovieReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    repo = MovieReviewRepo(),
    try:
        result = repo.update_review(id, review)
        return result
    except Exception as e:
        return Error(message=str(e))
