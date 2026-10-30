import {Link} from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to HostelHub Eldoret</h1>

                <p>HostelHub Eldoret helps university students discover verified,
                    affordable and comfortable hostels near major universities in Elodret.
                    Compare prices,explore amanities and book your preferred hostei with confidence </p>
                    <div className="hero-buttons">
                        <Link to="/hostels" className="primary-btn">Browse Hostels</Link>
                        <Link to="/about"  className="secondary-btn">Learn more</Link>

                    </div>

            </div>

        </section>
    );
}

export default Hero;