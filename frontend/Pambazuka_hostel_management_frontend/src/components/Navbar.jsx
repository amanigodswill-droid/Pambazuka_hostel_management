import {NavLink, useNavigate} from "react-router-dom";
import "../styles/Navbar.css";
import { toast } from "react-toastify";

function Navbar() {
    const navigate = useNavigate();

const savedUser = localStorage.getItem("currentUser");
const currentUser = savedUser && savedUser !== "undefined"? JSON.parse(savedUser): null;
const isLoggedIn =localStorage.getItem("isLoggedIn") === "true";

function handleLogout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");
  toast.success("Logged out successfully.");
  navigate("/");

}
  return (
    <header>
    <nav className="navbar">

        <div className="logo">
        <h2>Pambazuka</h2>
        <p>Find Your Perfect Student Home</p>
        </div>

        <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/hostels">Hostels</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/favorites">Favorites</NavLink></li>
            <li><NavLink to="/contact">Contacts</NavLink></li>

            </ul>
            {isLoggedIn? (
                <div className="user-section">
                    <span className="welcome-user">
                        Welcome,{currentUser?.fullName?.split(" ")[0]}
                    </span>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div> ):(

            <div className="nav-actions">
                <NavLink to="/login" className="login-btn">
                    Login
                </NavLink>
                <NavLink to="/register" className="register-btn">
                    Register
                </NavLink>
            </div>
)}
            </nav>
            </header>
  );
}



export default Navbar;