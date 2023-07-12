from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional, Dict
import requests
import os

API_KEY = os.environ['FAST_API_TMDB_API_KEY']

router=APIRouter()

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
                title = data['title'],
                genres = data['genres'],
                original_language = data['original_language'],
                overview = data['overview'],
                popularity = data['popularity'],
                poster_path = data['poster_path'],
                release_date = data['release_date'],
                vote_average = data['vote_average'],
                vote_count = data['vote_count'],
                backdrop_path = data['backdrop_path'],
                original_title = data['original_title']
            )
            return movie_details
    return None

# trending GET
@router.get('/movies/trending', response_model=List[MovieSearchOut])
def get_trending() -> List[MovieSearchOut]:
    tmdb_url = f"https://api.themoviedb.org/3/trending/movie/week?api_key={API_KEY}"
    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']
            return movie_details
    return None

# upcoming GET
@router.get('/movies/upcoming', response_model=List[MovieSearchOut])
def get_upcoming() -> List[MovieSearchOut]:
    tmdb_url = f"https://api.themoviedb.org/3/movie/upcoming?api_key={API_KEY}&language=en-US&page=1"
    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']
            return movie_details
    return None


# GET watch providers (Netflix, Amazon Prime, Disney+)
@router.get("/movies/{movie_id}/watch_providers", response_model=dict)
def get_movie_watch_providers(movie_id: int):
    tmdb_url = f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key={API_KEY}"
    # define response
    response = requests.get(tmdb_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            movie_details = data['results']
            print(movie_details)
            return movie_details







#
    # response = requests.get(tmdb_url)
    # if response.status_code == 200:
    #     data = response.json()
    #     return data['results']['US']

    # return response.status_code
# @router.get("/movies/omdb/{movie_name}")
# def get_from_omdb(movie_name: str) -> dict:
#     omdb_api_key = "3b11de2"
#     omdb_url = f"http://www.omdbapi.com/?apikey={omdb_api_key}&s={movie_name}"
#     response = requests.get(omdb_url)
#     print(response)
#     if response.status_code == 200:
#         movie_details = response.json()
#         print(movie_details)
#         if movie_details.get("Response") == "True":
#             return movie_details
#     return None


