import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import Movie from "../components/MovieSearch";
import useToken from "@galvanize-inc/jwtdown-for-react";


function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <div className="navbar">
      <div className="navbar-container">
        <NavLink className="logo-container" to="/"><h1 className="logo">reelistr</h1></NavLink>
        <div className="menu-container">
          {isLoggedIn ? (
            <ul className="menu-list">
              <NavLink className="nav-link" to="/"><li className="menu-list-item">Home</li></NavLink>
              <NavLink className="nav-link"><li className="menu-list-item">Movies</li></NavLink>
              <NavLink className="nav-link" to="/watchlist"><li className="menu-list-item">Watchlist</li></NavLink>
              <NavLink className="nav-link" to="/profile"><li className="menu-list-item">Profile</li></NavLink>
              <NavLink className="nav-link" onClick={logout}><li className="menu-list-item">Logout</li></NavLink>
            </ul>
          ) : (
            // Links to display when the user is not signed in
            <div className="menu-container">
              <ul className="menu-list">
                <NavLink className="nav-link" to="/"><li className="menu-list-item">Home</li></NavLink>
                <NavLink classname="nav-link" to="/comingsoon"><li className="menu-list-item">Movies</li></NavLink>
                <NavLink classname="nav-link" to="/login"><li className="menu-list-item">Login</li></NavLink>
                <NavLink className="nav-link" to="/signup"><li className="menu-list-item">Sign Up</li></NavLink>
              </ul>
            </div>
          )}
        </div>
        <div className="search-container"><li className="search-bar"><Movie /></li></div>
      </div>
    </div>
  )
}

export default Nav;


// return (
//   <div className="navbar">
//     <div className="navbar-container">
//       <NavLink className="navbar-brand" to="/">Reelistr</NavLink>
//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNavDropdown">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
//           </li>
//           <li className="nav-item">
//             <li><NavLink className="nav-link" aria-current="page" to="/signup">Sign Up</NavLink></li>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link" aria-current="page" to="/login">Log In</NavLink>
//           </li>
//           <li className="nav-item">
//             <li><NavLink className="nav-link" aria-current="page" to="/watchlist">Watchlist</NavLink></li>
//           </li>
//           <ul className="navbar-nav">
//             <li className="nav-item dropdown">
//               <NavLink className="nav-link dropdown-toggle" aria-current="page" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="/movies/">Movies</NavLink>
//               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                 <li><NavLink className="dropdown-item" aria-current="page" to="/movies/comingsoon">Coming Soon</NavLink></li>
//                 <li><NavLink className="dropdown-item" aria-current="page" to="/movies/trending">Trending</NavLink></li>
//               </ul>
//             </li>
//           </ul>
//           <ul className="navbar-nav">
//             <li className="nav-item dropdown">
//               <NavLink className="nav-link dropdown-toggle" aria-current="page" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="/user/">Profile</NavLink>
//               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                 <NavLink className="dropdown-item" aria-current="page" to="/user/profile">My Profile</NavLink>
//                 <li><NavLink className="dropdown-item" aria-current="page" to="/user/collections">Collections</NavLink></li>
//                 <li><NavLink className="dropdown-item" aria-current="page" to="/user/library">Library</NavLink></li>

//               </ul>
//             </li>
//           </ul>
//         </ul>
//         <li className="nav-link">
//           <Movie />
//         </li>
//       </div>
//     </div>
//   </div>
