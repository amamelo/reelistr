from fastapi import APIRouter, Depends, Response
from typing import List
from queries.movie_add import (
    MovieIn,
    MovieOut,
    MovieRepository
)

router = APIRouter()


@router.post("/movies/", response_model=MovieOut)
def add_movie_to_db(
    movie: MovieIn,
    response: Response,
    repo: MovieRepository = Depends(),
):
    return repo.add_movie_to_db(movie)


@router.get("/movies/{id}/", response_model=MovieOut)
def get_movie_from_db(
    id: int,
    response: Response,
    repo: MovieRepository = Depends(),
):
    return repo.get_movie_from_db(id)


@router.get("/movies/", response_model=List[MovieOut])
def get_all_movies_from_db(
    repo: MovieRepository = Depends(),
):
    return repo.get_all_movies_db()


@router.delete("/movies/{id}/", response_model=bool)
def delete_movie_from_db(
    id: int,
    response: Response,
    repo: MovieRepository = Depends(),
) -> bool:
    return repo.delete(id)
