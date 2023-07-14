from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional, Dict
from queries.reviews import MovieReviewRepo, MovieReviewIn, MovieReviewOut, Error

router = APIRouter()

#get all reviews
@router.get("/reviews", response_model=List[MovieReviewOut])
def get_all_reviews():
    repo = MovieReviewRepo()
    result = repo.get_all_reviews()
    return result

#add a review as a user to a specific movie
@router.post("/reviews", response_model=MovieReviewOut | Error)
def add_review(review: MovieReviewIn, username: str, movie_id: int):
    repo = MovieReviewRepo()
    try:
        result = repo.add_review(username, movie_id, review)
        print(result)
        return result
    except Exception as e:
        return Error(message=str(e))

#get reviews made by a specific user
@router.get("/reviews/user/{username}", response_model=List[MovieReviewOut])
def get_reviews_by_user(username: str):
    repo = MovieReviewRepo()
    result = repo.get_reviews_by_user(username)
    return result

#get reviews for a specific movie
@router.get("/reviews/movie/{movie_id}", response_model=List[MovieReviewOut])
def get_reviews_by_movie(movie_id: int):
    repo = MovieReviewRepo()
    result = repo.get_reviews_by_movie(movie_id)
    return result

#delete a review
@router.delete("/reviews/{id}", response_model=bool)
def delete_review(id: int):
    repo = MovieReviewRepo()
    result = repo.delete_review(id)
    return result

#update a review
@router.put("/reviews/{id}", response_model=MovieReviewOut | Error)
def update_review(id: int, review: MovieReviewIn):
    repo = MovieReviewRepo()
    try:
        result = repo.update_review(id, review)
        return result
    except Exception as e:
        return Error(message=str(e))

#add a review as a user to a specific movie

