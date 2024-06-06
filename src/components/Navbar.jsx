import "./Navbar.css"
import { Link } from 'react-router-dom';
export default function NavbarComponent() {
    return (
        <nav className="navbar bg-info navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" href="#">PUTA-Elections</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/voters">Voters</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vote">Vote</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/results">Results</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

// return (
//     <nav>
//         <Link to={'/'} className="navItem">Home</Link>
//         <Link to={'/vote'} className="navItem">Vote</Link>
//         <Link to={'/results'} className="navItem">Results</Link>
//         <Link to={'/login'} className="navItem">Login</Link>
//     </nav>
// );