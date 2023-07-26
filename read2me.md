## Reelistr

* Rey Xeka
* Lucas Haskell
* Angelica Melo
* Daniel Barker

Reelistr - Unleash the Magic of Cinema with Reelistr: Your Ultimate Film Database!

Reelistr makes use of [The Movie Database API](https://developer.themoviedb.org/docs)

Reelistr caters to a wide range of users, from casual movie watchers to hardcore film critics.

## Functionality

* Users who come to Reelistr can keep track of the films they've watched using the library functionality and give them ratings (0 to 5 stars)
* Users can write reviews on specific movies and read reviews other users have left. These reviews can be shared with others.
* Users can create collections of films based on various themes, genres, directors, or any criteria they choose.
* Users can view upcoming and trending films.

## Project initialiazation

To run this project you must follow the following steps:

* Clone repository to your local machine
* Navigate into the local directory in your terminal
* Create a .env file inside the top level directory with the following format:
```
REACT_APP_API_HOST=http://localhost:8000
SIGNING_KEY={Your signing key here}
TMDB_API_KEY={Your TMDB API key here}

```
* TMDB API key can be attained for free directly from TMDB
* Create the docker volumes necessary with the commands 'docker volume create postgres-data' and 'docker volume create pg-admin'
* Build the docker images and containers with the command 'docker compose build'
* Finally, start the project with the command 'docker compose up'

Enjoy!
