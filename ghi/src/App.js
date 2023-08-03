import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import Nav from "./navigation/Nav.js";
import Home from "./pages/Home.js";
import LoginForm from "./components/Login.js";
import MovieDetails from "./pages/MoviesDetails.js";
import Profile from "./pages/Profile.js";
import CollectionList from "./pages/CollectionList.js";
import Watchlist from "./pages/Watchlist.js";
import SignUpForm from "./components/Signup.js";
import ComingSoonApi from "./components/ComingSoon.js";
import Trending from "./components/Trending.js";
import Reviews from "./components/Reviews.js";
import CollectionDetail from "./pages/CollectionDetail";
import CreateCollection from "./components/CreateCollection";
import Movie from "./components/MovieSearch";


function App() {

  const baseUrl = process.env.REACT_APP_API_HOST
  const domain = /https:\/\/[^/]+/
  const basename = process.env.PUBLIC_URL.replace(domain, '')

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider baseUrl={baseUrl}>
        <Nav />
        <div>
          <Routes>
            <Route path="/movie/:title" element={<Movie />} />
            <Route path="/createcollection" element={<CreateCollection />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/movies">
              <Route path=":movie_id" element={<MovieDetails />} />
              <Route path="/movies/comingsoon" element={<ComingSoonApi />} />
              <Route path="/movies/trending" element={<Trending />} />
            </Route>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="user/:username" >
              <Route path="collections" element={<CollectionList />} />
              <Route path=":collection_id" element={<CollectionDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="watchlist" element={<Watchlist />} />
            </Route>
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
