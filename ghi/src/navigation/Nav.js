import { NavLink } from 'react-router-dom';

function Nav() {

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{ color: 'white', backgroundColor: '#2D3260' }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Reelistr</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <NavLink className="dropdown-item" aria-current="page" to="/">Home</NavLink>
                    <NavLink className="dropdown-item" aria-current="page" to="/login">Log In</NavLink>
                    <NavLink className="dropdown-item" aria-current="page" to="/moviedetails">Movie Details</NavLink>
                    <NavLink className="dropdown-item" aria-current="page" to="user/profile">Profile</NavLink>
                    <NavLink className="dropdown-item" aria-current="page" to="/collections">Collections</NavLink>
                    <NavLink className="dropdown-item" aria-current="page" to="/watchlist">Watchlist</NavLink>
                    {/* <ul className="navbar-nav"> */}
                    {/* <li className="nav-item dropdown">
                            <NavLink className="nav-link active dropdown-toggle" aria-current="page" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="/">menu</NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><NavLink className="dropdown-item" aria-current="page" to="/">Home</NavLink></li>
                                <li><NavLink className="dropdown-item" aria-current="page" to="/login">Log In</NavLink></li>
                                <li><NavLink className="dropdown-item" aria-current="page" to="/moviedetails">Movie Details</NavLink></li>
                                <li><NavLink className="dropdown-item" aria-current="page" to="user/profile">Profile</NavLink></li>
                                <li><NavLink className="dropdown-item" aria-current="page" to="/collections">Collections</NavLink></li>
                                <li><NavLink className="dropdown-item" aria-current="page" to="/watchlist">Watchlist</NavLink></li>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> */}

                    {/* </ul>
                </ul>
            </li>
        </ul> */}
                </div >
            </div >
        </nav >
    )

}

export default Nav;
