from typing import List
from fastapi import (
    Depends,
    Response,
    APIRouter,
    Request,
)
from routers.authenticator import authenticator

from queries.watchlist import (
    MovieWatchlistOut,
    MovieWatchlistRepo,
    MoviesWatchlistUserOut,
    Error
)

router = APIRouter()


@router.post("/users/{username}/watchlist",
             response_model=MoviesWatchlistUserOut | Error)
async def create_watchlist(
    username: str,
    request: Request,
    repo: MovieWatchlistRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_watchlist(username)


@router.get("/users/{username}/watchlist/{watchlist_id}",
            response_model=List[MovieWatchlistOut] | Error)
async def get_watchlist_detail(
    username: str,
    watchlist_id: int,
    request: Request,
    repo: MovieWatchlistRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> List[MovieWatchlistOut]:

    return repo.get_watchlist_details(username, watchlist_id)


@router.get("/watchlists",
            response_model=List[MoviesWatchlistUserOut] | Error)
async def get_all_watchlists(
    request: Request,
    repo: MovieWatchlistRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_watchlists()


@router.post("/users/{username}/watchlist/{watchlist_id}",
             response_model=MovieWatchlistOut | Error)
async def add_to_watchlist(
    username: str,
    watchlist_id: int,
    movie_id: int,
    watched: bool,
    request: Request,
    repo: MovieWatchlistRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.add_to_watchlist(username, watchlist_id, movie_id, watched)


@router.delete("/users/{username}/watchlist/{watchlist_id}/{movie_id}",
               response_model=bool | Error)
async def delete_from_watchlist(
    username: str,
    watchlist_id: int,
    movie_id: int,
    response: Response,
    repo: MovieWatchlistRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_from_watchlist(username, watchlist_id, movie_id)
