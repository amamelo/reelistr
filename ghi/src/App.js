import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Nav from "./navigation/Nav.js";
import Home from "./Home.js";
import LoginForm from "./components/Login.js";
import MovieDetails from "./pages/MoviesDetails.js";
import Profile from "./pages/Profile.js";
import Collections from "./components/Collections.js";
import Watchlist from "./pages/Watchlist.js";


function App() {

  const baseUrl = process.env.REACT_APP_API_HOST

  return (
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl}>
        <Nav />
        <div>
          <Routes>
            <Route path="user">
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/moviedetails" element={<MovieDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>

        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

{
  /* <ErrorNotification error={error} />
<Construct info={launchInfo} /> */
}
