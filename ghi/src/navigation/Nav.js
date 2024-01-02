import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/styles.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
const baseUrl = process.env.REACT_APP_API_HOST


function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState('')
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const tokenUrl = `${baseUrl}/token`;
      const response = await fetch(tokenUrl, { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.account.username);
      }
    }
    fetchUserInfo();
  }, [token]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/movie/${search}`);
    setSearch("");
  };

  function userLogout() {
    fetch(`${baseUrl}/token`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false)
          navigate('/')
        } else {
          console.error('failed to log out!')
        }
      })
      .catch((error) => {
        console.error('error occurred during log out:', error)
      })
  }


  return (
    <nav className="navbar custom-navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand logo" to="/"><div className="logo">reelistr</div></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Movies
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/movies/trending">Trending</NavLink></li>
                <li><NavLink className="dropdown-item" to="/movies/comingsoon">Coming Soon</NavLink></li>
              </ul>
            </li>
            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="/user/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Profile
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" to={`/user/${username}/profile`}>My Profile</NavLink></li>
                  <li><NavLink className="dropdown-item" to={`/user/${username}/collections`}>Collections</NavLink></li>

                </ul>
              </li>
            ) : null}
            {isLoggedIn ? (
              <li className="nav-item">
                <NavLink className="nav-link" to={`user/${username}/watchlist`}>Watchlist</NavLink>
              </li>
            ) : null}
          </ul>

          {isLoggedIn ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" onClick={userLogout} to="#">Logout</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Register</NavLink>
              </li>
            </ul>
          )}
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search} // Set the value of the input field to searchValue
              onChange={(e) => setSearch(e.target.value)} // Update searchValue when the input field changes
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}


export default Nav;
