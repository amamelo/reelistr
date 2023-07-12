## Luke Haskell Journal

### Day 1:
Got situated and acquainted with Angelica, Rey, and Dan. We decided on a team name, Terminal Titans, and a name for our app, Reelistr. The app will be a clone of an existing app called letterboxd. Reelistr will allow users to choose movies they've watched, rate them, comment on them, add favorites. It will include an account creation functionality in order to accomplish this.

### Day 2:
Rey worked on completing wireframes for the rest of our future pages. We continued planning how our app will be structured, as well as discussed the lecture from earlier in the day. I did a lot of research on whether to choose PostreSQL or MongoDB. I have some experience with mongo, but my experience was with in relation to JavaScript, so that experience isn't really applicable. It mostly came down to choosing whether we do the one that will be easier or the one that will be more marketable in the job hunt.

### Day 3:
Rey has completed the wireframes, and we weren't given a ton of time to work on anything else project-related today, so we spent time studying our exploration in Learn today.

### Day 10:
(7/10/23) Resuming from summer break. Before break, we'd sorted out most of our auth on the back end and had tested most endpoints in the fastapi terminal. However, some time during merging with the main branch, I undid a lot of our work, rendering most of our back end auth useless. On the Friday before returning to class, Dan and I got together to resolve the issues. So today we started fresh with functional auth. We continued on brainstorming our next steps and creating tables for other features, like reviews, collections, and watchlist.

### Day 11:
(7/11/23) Today we spent quite a long time in lecture before splitting into our project group, so our progress was limited. We had to ask Midge for help in the architecture of our tables. We concluded that we will need to perform some JOIN operations with our tables so that the tables can interact (?). I'm still fuzzy on that part, but the part that is clear is that those operations will take place in back-end python code. We have set a goal of the end of the week to have our back end complete. This seems extremely ambitious to me, but I will help in whatever way I can.

### Day 12:
(7/12/23) 



Reelistr CORE functionality:
[ ] Member Profile
[ ] Log in/ log out
[ ] authentication
[ ] Edit account
    [ ] change password
    [ ] change email
[ ] Create lists
    [ ] search bar/dropdown to select movie that is to be added to list
    [ ] ratings (stars, tomatoes, something different??)
    [ ] tags
[ ] View ‘my’ lists
[ ] Edit lists
[ ] Delete lists
[ ] My reviews

Stretch?:
    [ ] invite users to collaborate on lists
    [ ] share lists (link to view?)
    [ ] toggle public/private
    [ ] approve or deny additions to collaborated lists?

[ ] Movies | coming from TMD api

    [ ] List Trending Films
    [ ] List Coming Soon
    [ ] Detail page for each movie

        Data:
        [ ] Movie title
        [ ] Photo
        [ ]
        [ ]
        [ ] where it’s streaming
        [ ] list comments
        [ ] Create a comment
        [ ] Edit comment
        [ ] Delete comment

[ ] Reviews | appear on homepage, and profile, and its own page?
    [ ] list reviews
    [ ] create a review
    [ ] edit a review
    [ ] delete a review
[ ] NAV
    [ ] Home
        not logged in:
            [ ] see trending films, coming soon, reviews, create account, log in
        logged in:
            [ ] see recommendations, watchlists, profile, community, log out
    [ ] Movie Reviews ?
    [ ] log in/out
    [ ] create an account
    [ ] Watchlist (quickly access the watch list you made? )
    [ ] Profile (user profile, see lists and account info)
    [ ] Community (where you see other users? )
General Stretch Goals:
[ ] Discussion Forum
[ ] Recommendations for what to watch next (on homepage)
[ ]


Day 1: Got situated with Angelica, Rey, and Dan. We decided on a team name, Terminal Titans, and a name for our app, Reelistr. The app will be a clone of an existing app called letterboxd. Reelistr will allow users to choose movies they've watched, rate them, comment on them, add favorites. It will include an account creation functionality in order to accomplish this.



Reelistr CORE functionality:
[ ] Member Profile
[ ] Log in/ log out
[ ] authentication
[ ] Edit account
    [ ] change password
    [ ] change email
[ ] Create lists
    [ ] search bar/dropdown to select movie that is to be added to list
    [ ] ratings (stars, tomatoes, something different??)
    [ ] tags
[ ] View ‘my’ lists
[ ] Edit lists
[ ] Delete lists
[ ] My reviews

Stretch?:
    [ ] invite users to collaborate on lists
    [ ] share lists (link to view?)
    [ ] toggle public/private
    [ ] approve or deny additions to collaborated lists?

[ ] Movies | coming from TMD api

    [ ] List Trending Films
    [ ] List Coming Soon
    [ ] Detail page for each movie

        Data:
        [ ] Movie title
        [ ] Photo
        [ ]
        [ ]
        [ ] where it’s streaming
        [ ] list comments
        [ ] Create a comment
        [ ] Edit comment
        [ ] Delete comment

[ ] Reviews | appear on homepage, and profile, and its own page?
    [ ] list reviews
    [ ] create a review
    [ ] edit a review
    [ ] delete a review
[ ] NAV
    [ ] Home
        not logged in:
            [ ] see trending films, coming soon, reviews, create account, log in
        logged in:
            [ ] see recommendations, watchlists, profile, community, log out
    [ ] Movie Reviews ?
    [ ] log in/out
    [ ] create an account
    [ ] Watchlist (quickly access the watch list you made? )
    [ ] Profile (user profile, see lists and account info)
    [ ] Community (where you see other users? )
General Stretch Goals:
[ ] Discussion Forum
[ ] Recommendations for what to watch next (on homepage)
[ ]


