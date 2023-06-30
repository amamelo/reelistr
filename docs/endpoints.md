### «Human-readable of the endpoint»

* Endpoint path: «path to use»
* Endpoint method: «HTTP method»
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```



### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### All Users

* Endpoint path: /users
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
"user": [
  {
    "username": username,
    "email": email,
  }
]
    ```

### User Detail

* Endpoint path: /user/{id}
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  {
    "username": username,
    "email": email,

  }
    ```

### User Delete

* Endpoint path: /user/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»

* Response shape (JSON):
    ```json
  {
    "message": "user deleted"
  }
    ```

### Create User

* Endpoint path: /user
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
  {
    "username": username,
    "email": email,
    "password": password,
    "password_confirm": password
  }
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  {
    "message": "user created!"
  }
    ```

### User Watchlist

* Endpoint path: /user/{id}/watchlist
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

### Create User Watchlist

* Endpoint path: /user/{id}/watchlist
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    {
      "message": "watchlist created!",
    }
    ```


### User Reviews

* Endpoint path: /user/{id}/reviews
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

### Movie Reviews

* Endpoint path: /movie/{id}/reviews
* Endpoint method: GET

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  {
      "reviews": [
      {
        "review_id": int,
        "user_id": user,
        "movie_id": movie_id,
        "review": "stuff",
        "date": date
      }
      {
        "review_id": int,
        "user_id": user,
        "movie_id": movie_id,
        "review": "stuff",
        "date": date
      }
    ]
  }
    ```

### Create Review

* Endpoint path: /movie/{id}/reviews
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
  {
    "title": title,
    "review": review,
    "rating": bool,
    "user_id": user_id,
    <!-- phase 2: rating -->
  }
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  {
    "message": "review created!",
  }
    ```

### Delete Review

* Endpoint path: /movie/{id}/reviews/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json

    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  {
    "message": "review deleted!",
  }

### Edit Review

* Endpoint path: /movie/{id}/reviews/{id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
  {
    "title": title,
    "review": review,
    "rating": bool,
    "user_id": user_id,
    <!-- phase 2: rating -->
  }
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  {
    "message": "review edited!",
  }


### User All Lists

* Endpoint path: /user/{id}/lists
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  [
    {
      LISTS
    }
  ]
    ```

### Create List

* Endpoint path: /user/{id}/lists
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
  {
    "name": name,
  }
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
  {
    "message": "list created!",
  }
    ```

### Edit List

* Endpoint path: /user/{id}/lists/{listId}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      <!-- phase 1: just type in movie -->
      "name": name,
      "title": title,
      <!-- phase 2: when typing, app searches for movie to add -->
      "movie": "movie_id",
      <!-- need to fetch movie ID^ from TMDB -->
    }
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
      {
        "message": "list edited",
      }
    ```

### View List Detail

* Endpoint path: /user/{id}/lists/{listId}
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    {
      "list_of_movies": [
        {
          "movie_id": 1,
          "title": "The Matrix",
          "other_data": "other_data",
        },
        {
          "movie_id": 2,
          "title": "snatch",
          "other_data": "other_data",
        }
      ]
    }
    ```

### Delete User List

* Endpoint path: /user/{id}/lists/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    {
      "message": "list deleted",
    }
    ```