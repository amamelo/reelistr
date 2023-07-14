from typing import Optional, List
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from routers.authenticator import authenticator

from pydantic import BaseModel

from queries.movies_to_collection import (
    MovieToCollectionIn,
    MovieToCollectionOut,
    MovieToCollectionRepo,
    Error
)

router = APIRouter()


@router.post("/users/{username}/collections/{collection_id}/", response_model=MovieToCollectionOut| Error)
async def add_movie_to_collection(
    username: str,
    movie_id: int,
    collection_id: int,
    request: Request,
    repo: MovieToCollectionRepo = Depends(),
):
    return repo.add_movie_to_collection(username, movie_id, collection_id)

# get all movies in collection
@router.get("/users/{username}/collections/{collection_id}/", response_model=List[MovieToCollectionOut] | Error)
async def get_all_movies_in_collection(
    username: str,
    collection_id: int,
    response: Response,
    repo: MovieToCollectionRepo = Depends(),
) -> List[MovieToCollectionOut]:
    return repo.get_all_movies_in_collection(username, collection_id)




# @router.post("/users/{username}/collections/{collection_id}/", response_model=MovieToCollectionOut | Error)

# delete router
@router.delete("/users/{username}/collections/{collection_id}/{movie_id}", response_model=bool | Error)
async def delete_movie_from_collection(
    username: str,
    collection_id: int,
    movie_id: int,
    response: Response,
    repo: MovieToCollectionRepo = Depends(),
) -> bool:
    return repo.delete_movie_in_collection(username, collection_id, movie_id)