import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
        <Link className="navbar-brand" href="#" style={{ color: "#343a40" }}>
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
                  <b>HOME</b>
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/voters">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  <b>VOTERS</b>
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vote">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  <b> VOTE</b>
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/results">
                <span
                  data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse"
                >
                  <b> RESULTS </b>
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
                    <b> CANDIDATES </b>
                  </span>
                </Link>
              </li>
            )}
            {!loggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <span
                    data-bs-target="#navbarSupportedContent"
                    data-bs-toggle="collapse"
                  >
                    <b> LOGIN </b>
                  </span>
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item" onClick={onLogoutHandler}>
                <Link className="nav-link" to="/">
                  <span
                    data-bs-target="#navbarSupportedContent"
                    data-bs-toggle="collapse"
                  >
                    <b> LOGOUT </b>
                  </span>
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <Link className="nav-link">
                  <span
                    data-bs-target="#navbarSupportedContent"
                    data-bs-toggle="collapse"
                  >
                    <b> Logged In As ({localStorage.getItem("username")}) </b>
                  </span>
                </Link>
              </li>
            )}
          </ul>
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
