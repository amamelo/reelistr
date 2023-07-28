Friday July 28th
The project is due today. At last. 



Thursday July 27th
I continued working on the userprofile fixing some issues with the use effect (with help from Luke and the SEIRS). I did some more styling on the user profile, adding buttons and making the colors match the colors Rey changed the theme to. Additionally, I styled the collections, collection list, and and log in page. 
I realized there was something different that could have been done in the back end in terms of our "get movie from collection", currently we are getting movies based on the collection_id as a url parameter, when we want to get a specific collection detail on the front end, we are unable to get the collection name to appear dynamically, bc it's not part of the data that we fethc. I think that having included the collection_name would have solved this. 
Additionally, we are still missing a big part of the functionality of this application, that is the ability to add a movie to your watchlist or to your custom collection. I'm not sure how we are going to do this seeing that we don't have an endpoint to fethc all movies. We do however have a search movies endpoint. so perhaps if we allowed the user to search for a movie and then onclick or onsubmit add that movie to the collection? 
Hopefully tomorrow we can all work on that together. 


Wednesday July 26th
Today I began design on the user profile page, the homepage and worked a little on the styling of the sign up page. Adding a media scroller for the watched movies and collections, and also making sure reviews appeared on the page. 


Tuesday July 25th

Wrote my unit test! It looked very simple but was a little more challenging to understand. I kept on getting a "no test ran" error, which was fixed by moving the tests directory into the app directory. 


Monday July 24th

Started CI/CD with Luke which has been a little difficult to follow while Rey worked on CSS designs. 


Friday July 21st
no class


Thursday July 20th

Done:
-Finished front-end movie details page (needs styling) 
-Finished front-end collection detail page

Up Next:
[] User Profile
[] Collections (all)
[] Collection Detail
[] Unit tests (one per person)
[] CI/CD (must start on Monday, split up to get it done)
[] buttons (add movie to collection, add movie to watchlist)
[] Read Me file
[] Journals 

Front-End Styling:
[] Navigation: add search bar 
[] Movie Details Page
[] User Profile Page : container with user name + info, container with media scroller for—watchlist, collections, container for reviews. 
[] Log In
[] Sign Up
[] Homepage : media scroller of trending, media scroller of coming soon
[] My Collections (page that lists user’s collections)
[] Collection Detail Page
[] Watchlist Detail page 
[] buttons

If you want to work on features over the weekend, make a new branch, and let us know what you’re working on so we don’t overlap. 




Wednesday July 19th

Done:
-watchlists front end fetch
-Began front-end movie details page 


Up Next:
[] finish adding reviews to movie detail
[] User Profile
[] Collections (all)
[] Collection Detail
[] Unit tests (one per person)
[] CI/CD (must start on Monday, split up to get it done)
[] Read Me file
[] Journals 


Tuesday July 18th

Done:
-Front-end authentication
-Protect views
-Reviews component fetches reviews
-Trending component fetches data from TMDB and displays a list 
-Coming Soon component fetches data from TMDB, on click leads to blank movie detail page
-Sign up form 

Up Next:
[] Front end components - Movie Details, Collections 
[] Unit tests (one per person)

Hex Colors:
orange:
FF5F05
Brighter for buttons:
FB6900

Navy blue:
2D3260

Grey:
EEEEEE


Monday July 17th

Done:
Watchlist crud
Watchlist automatically created when an account is made

Up Next:
[] Front-end authentication
[] protect views
[] Unit tests (one per person)
[] Front end components! 

Notes:
Library is not necessary bc we put a bool in join table

Due Date: July 28th


Friday July 14th

Done:CRUD for Movies in Collections
Made branches for “Reviews CRUD, Library CRUD, Watchlist CRUD”Updated Reviews table to reference Movies
Updated Library to reference Movies in its branch
Updated Watchlist to reference Movies in its branch
Designed a diagram for our table set up in excalidraw
To Do: 
Reviews CRUD
Watchlist CRUD
Library CRUD
Front End Authentication
Protect APIS for authentication (add jwt down code)
Error: Operator…? 
Change the order of the parameters in the query function to match the order of the SELECT and url path in the router. 

Note: index numbers in the routes need to match the structure of the table


Create a watchlist
Add a film to watchlist,


Automatically create watchlist when account is made 
Add create watchlist to parameters and do a dependency injection like in line 42, watchlist repo: MovieWatchlistRepo = depends()

After try statement in account, pass in parameters that that create watchlist function needs) 



Thursday July 13th

Today:
-Merge finished (movie_collection CRUD and TMDB crud)working features to Main 
-CRUD for movies database: finished and merged
-Completed the “create” of CRUD for movies_in_collection

Next steps:
Complete CRUD for movies_in_collection
CRUD apis for reviews
CRUD apis for movies 
Merge finished working features to Main 
Protect views (add jwt-token code)
Front-End Authentication

Errors:
“Unprocessable entity” : solved by matching the path of router.post to router.get

Attribute error: nonetype
Solution: the movie_id we were inputing was not matching the id (tmdb_movie_id) that was being referenced. 

Notes: add timestamp to Reviews table in database

Goals:
[] Finish the back-end by the end of the week
[] Next week focus on Front-end
[] Last week before due date aim to work on fine-tuning/stretch goals

I’ve been feeling much more comfortable withe the group and also understanding how things work a lot more. 



Wednesday July 12th
Today:
-created all the apis for the TMDB
-finished CRUD apis for Collections


Next steps:
CRUD apis for reviews
CRUD apis for movies 
Merge finished working features to Main 
Protect views (add jwt-token code)
Front-End Authentication


Goals:
[] Finish the back-end by the end of the week
[] Next week focus on Front-end
[] Last week before due date aim to work on fine-tuning/stretch goals


Tuesday July 11

-We have to create a more detailed table for storing movies into our database. -Began setting up fastapi CRUD for movie_collection 
-Note from when Mitch helped: user will search movie, once movie is selected and added to that collection, movie data will be stored into our own database (movies table) 

questions: how do we translate our joined table into our apis? 

To do: 
-Continue setting up tables
-Continue CRUD for Reviews, Movies, Collection, watchlist, library
-Add “require token” code to views we want protected (only accessed by logged in user). 

Goals:
[] Finish the back-end by the of the week
[] Next week focus on Front-end
[] Last week before due date aim to work on fine-tuning/stretch goals


Monday, July 10

Today we accomplished:

- Decided to use TMDB as our third party api (after deliberating between OMDB and TMDB)
- Front-End Nav set up
- Front-End Movie Search bar set up
- Set up Database Tables

What’s Next:
[] Create table for Watchlist
[] CRUD FastAPI for Collections, Reviews, Watchlist
[] FastAPI for TMDB (backend)

Goals:
[] Finish the back-end by the of the week
[] Next week focus on Front-end
[] Last week before due date aim to work on fine-tuning/stretch goals

Friday, June 30

Today we completed authentication! We gained a better understanding of the jwtdown fastapi code. Came across a couple of errors and decided to start keeping a journal of errors for future reference. Accomplished our goal of completing Authentication by today.
It felt like a slow start at the beginning of all this, but today it felt like things were moving along at a better pace, particularly in terms of how we work together. 
We've established to not put pressure on each other about working over the break, but we are free to do research and share anything with the group on Slack. 
 

Thursday, June 29

Continued with authentication. Came across errors that really slowed us down. These errors have been helpful, however, in allowing us to get a better understanding of how things worked. We worked until we were able to fix the errors.

Accomplishments:
- Log in/log out authentication

Goals: 
Continue with authentication for account creation
Have authentication ready by Friday. 


Wednesday, June 28th
Accomplishments:
Log in/log out authentication
Goals:
Have authentication ready by Friday.

Tuesday, June 27
Today I designed a logo for our Reelistr app. Additionally, we set up the postgresql database and connected to pgAdmin. We were having some issues so we all attempted run the containers on our individual branches to make sure everything was working for everyone. 
We set up goals for what is next. 

Accomplishments:
- Set up postgresql on our project
- Connected pgAdmin
- Everyone succeeded in running containers without errors. 

Next steps:
- Database table creation
- Authentication (waiting on lecture)

Goals:
Tomorrow: get started on authentication 
Have authentication ready by Friday, June 30th (before break)


Monday, June 26

Today we worked on creating issues on Gitlab
We realized that using the term lists could be comfusing so instead, users will have 
-"Collections" which will be customized, user-created lists. 
-"Libary" a list of all the movies that the user has watched
-"Watchlist" an empty list provided by the application to which user will add movies they WANT to see from the homepage. 
(i'd say that is our Aha! moment)


Day 5:
We assigned roles so that we can more seamlessly work together as a team and stay on track with our project goals. 
I took notes for the team as I was assigned to be Notetaker:


Established roles to make sure we stay on track to completing our project.
REY: Facilitator
LUKE: Editor
DAN: Progress Chaser
ANGELICA: NoteTaker
We'll set goals for the day
If we find resources we’ll share them onto slack.
Everyone will make an effort to clarify and make sure every one is on the same page, so that at end of day we are clear on what decisions have been made and where we stand on our progress.
Accomplishments:
Merged all journals onto main branch.
Began our design of our API endpoints. Luke was our driver as we discussed what data was needed for each endpoint.
We concluded that we will work in phases. Meaning we will start by making sure our MVP is working and move onto add features (e.g search feature for movies, community forum) moving step by step towards our stretch goals.



Day 4: Took a deeper dive into our wireframes and started designing our API's 



Day 3: we continued doing wireframe design, discussed questions and which database might be better for us to use. 


Day 2: we continued working on wireframing, coming to a better understanding of the project. Began analyzing the data we would receive from the movie datapase api and the type of data that we would be gathering from users. 


Day 1:

We landed on Reelistr for a project idea and developed the design further. We use Letterboxd as inspiration and found the Movie Database api which will be the main api we will use for our project. 


The date of the entry
A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small
