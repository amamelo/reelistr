import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink, Link } from 'react-router-dom';
import Movie from "../components/MovieSearch";


function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: 'white', backgroundColor: '#2D3260' }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Reelistr</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="#navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink className="nav-link active" aria-current="page" to="/">
                            <li className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Home</li>
                        </NavLink>
                        <NavLink className="nav-link active" aria-current="page" to="/signup">
                            <li className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Sign Up</li>
                        </NavLink>
                        <NavLink className="nav-link active" aria-current="page" to="/login">
                            <li className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Log In</li>
                        </NavLink>
                        <NavLink className="nav-link active" aria-current="page" to="/watchlist">
                            <li className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Watchlist</li>
                        </NavLink>
                        <li className='nav-item dropdown'>
                            <Link className='nav-link dropdown-toggle' role='button' data-bs-toggle='dropdown' aria-expanded='false' href="/user/profile">
                                My Profile
                            </Link>
                            <ul className='dropdown-menu'>
                                <NavLink className="nav-link" to="user/profile">
                                    <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Profile Page</li>
                                </NavLink>
                                <li>
                                    <hr className='dropdown-divider' />
                                </li>
                                <NavLink className="nav-link" to="user/collections">
                                    <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Collections</li>
                                </NavLink>
                                <li>
                                    <hr className='dropdown-divider' />
                                </li>
                                <NavLink className="nav-link" to="/user/library">
                                    <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Library</li>
                                </NavLink>
                            </ul>
                        </li>
                        <li className='nav-item dropdown'>
                            <Link href="/" className='nav-link dropdown-toggle' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                Movies
                            </Link>
                            <ul className='dropdown-menu'>
                                <NavLink className="nav-link" to="/movies/comingsoon">
                                    <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Coming Soon</li>
                                </NavLink>
                                <li>
                                    <hr className='dropdown-divider' />
                                </li>
                                <NavLink className="nav-link" to="/movies/trending">
                                    <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Trending</li>
                                </NavLink>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Nav;

//<nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{ color: 'white', backgroundColor: '#2D3260' }}>
        //     <div className="container-fluid">
        //         <NavLink className="navbar-brand" to="/">Reelistr</NavLink>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav">
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <li><NavLink className="nav-link" aria-current="page" to="/signup">Sign Up</NavLink></li>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink className="nav-link" aria-current="page" to="/login">Log In</NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <li><NavLink className="nav-link" aria-current="page" to="/watchlist">Watchlist</NavLink></li>
        //                 </li>
        //                 <ul className="navbar-nav">
        //                     <li className="nav-item dropdown">
        //                         <NavLink className="nav-link dropdown-toggle" aria-current="page" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="/movies/">Movies</NavLink>
        //                         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        //                             <li><NavLink className="dropdown-item" aria-current="page" to="/movies/comingsoon">Coming Soon</NavLink></li>
        //                             <li><NavLink className="dropdown-item" aria-current="page" to="/movies/trending">Trending</NavLink></li>
        //                         </ul>
        //                     </li>
        //                 </ul>
        //                 <ul className="navbar-nav">
        //                     <li className="nav-item dropdown">
        //                         <NavLink className="nav-link dropdown-toggle" aria-current="page" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="/user/">Profile</NavLink>
        //                         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        //                             <NavLink className="dropdown-item" aria-current="page" to="/user/profile">My Profile</NavLink>
        //                             <li><NavLink className="dropdown-item" aria-current="page" to="/user/collections">Collections</NavLink></li>
        //                             <li><NavLink className="dropdown-item" aria-current="page" to="/user/library">Library</NavLink></li>

        //                         </ul>
        //                     </li>
        //                 </ul>
        //             </ul>
        //             <li className="nav-link">
        //                 <Movie />
        //             </li>
        //         </div>
        //     </div>
        // </nav>