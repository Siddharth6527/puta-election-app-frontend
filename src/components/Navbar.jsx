import { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavbarComponent({ isAdmin, isDev, hasVoted, isLoggedin }) {
  const [loggedIn, setLoggedIn] = useState();
  const navigate = useNavigate();
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
    navigate(0);
  };

  return (
    <nav className="navbar navbar-expand-lg">
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
          <span className="navbar-toggler-icon navbar-dark"></span>
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
            {isLoggedin && (
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
            )}
            {!hasVoted && isLoggedin && (
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
            )}
            {!isLoggedin && isAdmin && (
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

          {isLoggedin && (
            <div className="dropdown-center">
              <button className="btn nav-item p-0 m-0" data-bs-toggle="dropdown">
                <Link className="nav-link">
                  <AccountCircleIcon />
                  <span
                    data-bs-target="#navbarSupportedContent"
                    data-bs-toggle="collapse"
                    className="info-text"
                  >
                    {localStorage.getItem("username")}
                  </span>
                  <span className="fs-6 ms-2">&#9660;</span>
                </Link>
              </button>
              <div className="dropdown-menu dropdown-menu-end p-0">
                <div className="nav-item menu-item text-center">
                  <Link className="nav-link" to="/changePassword">
                    <span
                      data-bs-target="#navbarSupportedContent"
                      data-bs-toggle="collapse"
                      className="info-text"
                    >
                      Change Password
                    </span>
                  </Link>
                </div>

                <div className="nav-item menu-item text-center info-text" onClick={onLogoutHandler}>
                  <Link className="nav-link" to="/">
                    <span
                      data-bs-target="#navbarSupportedContent"
                      data-bs-toggle="collapse"
                      className="info-text"
                    >
                      LOGOUT
                    </span>
                  </Link>
                </div>
              </div>
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
