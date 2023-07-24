from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional, Dict
import requests
import os

API_KEY = os.environ['FAST_API_TMDB_API_KEY']

router = APIRouter()


class Error(BaseModel):
    message: str


class MovieSearchOut(BaseModel):
    title: str
    overview: str
    poster_path: str
    release_date: str
    poster_path: Optional[str]
    id: int


class Genre(BaseModel):
    id: int
    name: str


class MovieDetailsOut(BaseModel):
    title: str
    genres: List[Genre]
    original_language: str
    overview: str
    popularity: float
    poster_path: Optional[str]
    release_date: str
    vote_average: float
    vote_count: int
    backdrop_path: Optional[str]
    original_title: str


class Provider(BaseModel):
    provider_id: int
    provider_name: str


class WatchProvider(BaseModel):
    provider_id: int
    provider_name: str
    display_priority: int


class usProviders(BaseModel):
    us: Optional[Dict[str, List[Provider]]] = None


class WatchProviders(BaseModel):
    results: Optional[usProviders] = None


@router.get("/movies/{movie_name}", response_model=List[MovieSearchOut])
def search_tmdb(movie_name: str) -> List[MovieSearchOut]:
    encoded_movie_name = requests.utils.quote(movie_name)
    tmdb_url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={encoded_movie_name}"

    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']
            return movie_details
    return None


# movie details GET
@router.get('/movies/details/{movie_id}', response_model=MovieDetailsOut)
def get_details_from_tmdb(movie_id: int) -> MovieDetailsOut:
    tmdb_url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}"
    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data:
            movie_details = MovieDetailsOut(
                title=data['title'],
                genres=data['genres'],
                original_language=data['original_language'],
                overview=data['overview'],
                popularity=data['popularity'],
                poster_path=data['poster_path'],
                release_date=data['release_date'],
                vote_average=data['vote_average'],
                vote_count=data['vote_count'],
                backdrop_path=data['backdrop_path'],
                original_title=data['original_title']
            )
            return movie_details
    return None


# trending GET
@router.get('/trending/', response_model=List[MovieSearchOut])
def get_trending() -> List[MovieSearchOut]:
    tmdb_url = f"https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}"
    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']
            return movie_details
    return None


# upcoming GET
@router.get('/upcoming', response_model=List[MovieSearchOut])
def get_upcoming() -> List[MovieSearchOut]:
    tmdb_url = f"https://api.themoviedb.org/3/movie/upcoming?api_key={API_KEY}&language=en-US&page=1&region=US&with_release_type=2|3"
    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']
    return movie_details


# GET watch providers (Netflix, Amazon Prime, Disney+)
@router.get("/movies/{movie_id}/watch_providers", response_model=dict | list)
def get_movie_watch_providers(movie_id: int):
    tmdb_url = f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key={API_KEY}"
    # define response
    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']['US']['flatrate']
            print(movie_details)
            return movie_details
