import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavbarComponent({ isAdmin }) {
  const [loggedIn, setLoggedIn] = useState();

  if (loggedIn) {
    if (!localStorage.getItem("authToken")) {
      setLoggedIn(false);
    }
  } else {
    if (localStorage.getItem("authToken")) {
      setLoggedIn(true);
    }
  }

  const onLogoutHandler = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <nav className="navbar bg-info navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand me-4" href="#" style={{ color: "#343a40" }}>
          PUTA-Elections 2024
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  {" "}
                  HOME
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/voters">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  VOTERS
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vote">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  VOTE
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/results">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  RESULTS
                </span>
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/candidates">
                  <span
                    data-bs-target="#navbarSupportedContent"
                    data-bs-toggle="collapse"
                  >
                    CANDIDATES
                  </span>
                </Link>
              </li>
            )}
          </ul>
          {!loggedIn && (
            <div className="nav-item info-text">
              <Link className="nav-link" to="/login">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  LOGIN
                </span>
              </Link>
            </div>
          )}
          {loggedIn && (
            <div className="nav-item">
              <Link className="nav-link small">
                <AccountCircleIcon />
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                  className="info-text"
                >
                  {localStorage.getItem("username")}
                </span>
              </Link>
            </div>
          )}
          {loggedIn && (
            <div className="nav-item">
              <Link className="nav-link small" to="/changePassword">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                  className="info-text"
                >
                  Change Password
                </span>
              </Link>
            </div>
          )}
          {loggedIn && (
            <div className="nav-item" onClick={onLogoutHandler}>
              <Link className="nav-link" to="/">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  LOGOUT
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// return (
//     <nav>
//         <Link to={'/'} className="navItem">Home</Link>
//         <Link to={'/vote'} className="navItem">Vote</Link>
//         <Link to={'/results'} className="navItem">Results</Link>
//         <Link to={'/login'} className="navItem">Login</Link>
//     </nav>
// );
