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
            <Route path="/movie/:title" element={<Movie baseUrl={baseUrl} />} />
            <Route path="/createcollection" element={<CreateCollection baseUrl={baseUrl} />} />
            <Route path="watchlist" element={<Watchlist baseUrl={baseUrl} />} />
            <Route path="/" element={<Home baseUrl={baseUrl} />} />
            <Route path="/login" element={<LoginForm baseUrl={baseUrl} />} />
            <Route path="/movies">
              <Route path=":movie_id" element={<MovieDetails baseUrl={baseUrl} />} />
              <Route path="/movies/comingsoon" element={<ComingSoonApi baseUrl={baseUrl} />} />
              <Route path="/movies/trending" element={<Trending baseUrl={baseUrl} />} />
            </Route>
            <Route path="/signup" element={<SignUpForm baseUrl={baseUrl} />} />
            <Route path="user" >
              <Route path="collections" element={<CollectionList baseUrl={baseUrl} />} />
              <Route path=":collection_id" element={<CollectionDetail baseUrl={baseUrl} />} />
              <Route path="profile" element={<Profile baseUrl={baseUrl} />} />
            </Route>
            <Route path="/reviews" element={<Reviews baseUrl={baseUrl} />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
