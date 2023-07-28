
## Reelistr

* Rey Xeka
* Lucas Haskell
* Angelica Melo
* Daniel Barker

Reelistr - Unleash the Magic of Cinema with Reelistr: Your Personal Film Database!

Reelistr makes use of [The Movie Database API](https://developer.themoviedb.org/docs)


## Design
[table Design][https://gitlab.com/BarkMulcher/module3-project-gamma/-/tree/main/docs?ref_type=heads]
[Wireframes][https://gitlab.com/BarkMulcher/module3-project-gamma/-/tree/main/docs?ref_type=heads]
[Reelistr Prototype][https://www.figma.com/proto/qettrCnGJDA0eKdWO0bZ94/Reelistr?node-id=1-3&starting-point-node-id=1%3A3&mode=design&t=LzJjCRK9t9dadCk3-1]

## Intended Market
Reelistr caters to a wide range of users, from casual movie watchers to hardcore film critics.
Whether you’re a movie buff looking to keep track of the millions of movies you’ve watched and those you want to watch or you’re simply looking to decide what to watch next. 

## Functionality

MVP: 
* Users can view upcoming and trending films.
* Users can search for a movie and see the movie details
* Users can create an account to get access to more customized features
* Members can write reviews on specific movies and read reviews other users have left.
* Once an account is created, Members automatically have access to a Wathclist. the Wathclist is a list of movies they want to watch. 
* Members can create a custom Collection of films based on various themes, genres, directors, or any criteria they choose. 
* Members have access to their user profile in which they can see their Watchlist, Collections, and Reviews. 

Future Functionality: 
* Members can add movies to their watchlist by clicking a button
* Members can add movies to their collections by clicking a button
* Members who come to Reelistr can keep track of all the films they've watched using the library functionality and give them ratings (0 to 5 stars)

## Project initialization

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

* Run docker volume create postgres-db
* Run docker volume create pg-admin
* Build the docker images and containers with the command 'docker compose build'
* Finally, start the project with the command 'docker compose up'

Enjoy!
