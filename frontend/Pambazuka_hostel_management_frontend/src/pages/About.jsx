import {FaUniversity, FaBullseye, FaEye, FaShieldAlt, FaCheckCircle, FaUser} from "react-icons/fa";
import "../styles/About.css";
import FAQ from "../components/FAQ";

function About() {
    return (
        <main className="about-page">
            <section className="about-hero">
                <span className="about-label">GET TO KNOW US</span>
                <h1>About Pambazuka</h1>
                <p>Pambazuka is committed to helping university students find safe, affordable and reliable accommodation. Through our platform, students can explore hostel listings and make informed decisions before arriving on campus.</p>
            </section>

            <section className="about-section">
                <div className="about-card">
                    <FaUser className="icon" />
                    <h2>Who We Are</h2>
                    <p>Pambazuka is a student accommodation platform designed to simplify finding hostels in Eldoret. We connect students with reliable accommodation options while making the booking process easier and faster.</p>
                </div>

                <div className="about-card">
                    <FaBullseye className="icon" />
                    <h2>Our Mission</h2>
                    <p>To simplify finding off-campus accommodation through trusted information, transparent pricing and an easy booking experience.</p>
                </div>

                <div className="about-card">
                    <FaEye className="icon" />
                    <h2>Our Vision</h2>
                    <p>To become one of Kenya's most trusted student accommodation platforms by connecting students with quality housing in university towns.</p>
                </div>
            </section>

            <section className="why-hostelHub">
                <h2>Why Choose Pambazuka?</h2>

                <div className="about-features">
                    <div>
                        <FaCheckCircle className="icon" />
                        <h3>Verified Hostels</h3>
                        <p>We provide carefully selected accommodation options to help students make informed choices.</p>
                    </div>

                    <div>
                        <FaUniversity className="icon" />
                        <h3>Student Focused</h3>
                        <p>Built specifically to address the accommodation challenges faced by university students.</p>
                    </div>

                    <div>
                        <FaShieldAlt className="icon" />
                        <h3>Safe and Secure</h3>
                        <p>We prioritise safety and security throughout the hostel discovery and booking experience.</p>
                    </div>
                </div>

                <FAQ />
            </section>
        </main>
    );
}

export default About;
