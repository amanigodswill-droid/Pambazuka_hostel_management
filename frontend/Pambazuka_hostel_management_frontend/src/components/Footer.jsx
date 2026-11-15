import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h2>Pambazuka</h2>
                    <p>Helping university students find safe, affordable and reliable accommodation around Eldoret.</p>
                </div>

                <div className="footer-links">
                    <h3>Explore</h3>
                    <Link to="/">Home</Link>
                    <Link to="/hostels">Find Hostels</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>

                <div className="footer-links">
                    <h3>Account</h3>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Create Account</Link>
                    <Link to="/favorites">Favorites</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Pambazuka Hostel Management. All rights reserved.</p>
                <span>Find your place. Feel at home.</span>
            </div>
        </footer>
    );
}

export default Footer;
