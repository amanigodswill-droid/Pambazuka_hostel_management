import { Link } from "react-router-dom";
import "../styles/Hero.css";
import heroImage from "../assets/Kenyan-hostel.png";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <span className="hero-label">YOUR COMFORT, OUR PRIORITY</span>

                <h1>Find a place you'll love to call home.</h1>
                <p>Discover affordable and comfortable student hostels around Eldoret. Compare prices, explore amenities and find accommodation that suits your needs.</p>
                <div className="hero-buttons">
                    <Link to="/hostels" className="primary-btn">
                        Browse Hostels
                    </Link>

                    <Link to="/about" className="secondary-btn">
                        Learn More
                    </Link>
                </div>
            </div>

            <div className="hero-image">
                <img src={heroImage} alt="Student hostel accommodation" />
            </div>
        </section>
    );
}

export default Hero;
