import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.authenticator import authenticator
from routers import (
    accounts,
    movies,
    movie_collection,
    movie_add,
    movies_to_collection,
    reviews,
    watchlist
)

origins = [
    os.environ.get("CORS_HOST"),
    "https://localhost:3000",
    'https://barkmulcher.gitlab.io/module3-project-gamma',
    'https://mar-2-et-reelistr.mod3projects.com'
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get('/')
# def root():
#     return {'message': 'you hit the root path!'}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }


app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(movies.router)
app.include_router(movie_collection.router)
app.include_router(movie_add.router)
app.include_router(movies_to_collection.router)
app.include_router(reviews.router)
app.include_router(watchlist.router)
