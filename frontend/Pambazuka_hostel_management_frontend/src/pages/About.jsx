import {FaUniversity, FaBullseye, FaEye, FaShieldAlt, FaCheckCircle, FaUser} from "react-icons/fa";
import "../styles/About.css";
import FAQ from "../components/FAQ";
function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
      <h1>About HostelHub Ltd</h1>
      <p>HostelHub Ltd is a company committed to helping university students secure
        safe,affordable and reliable accomodation.Through our digital platform,
        students can explore verified hostel listings and make informed decisions before arriving on campus.
      </p>
      </section>
      <section className="about-section">
        <div className="about-card">
          <FaUser className="icon"/>
          <h2>Who We Are</h2>
          <p>HostelHub is a student accomodation platform designed to simplify the process of finding hostels
            in Eldoret.We connect students with reliable accommodation options while making the booking process
             easier and faster.
          </p>
        </div>
        <div className="about-card">
          <FaBullseye className="icon"/>
        <h2>Our Mission</h2>
        <p>To simplify the process of finding off-campus accommodation by providing
            trusted information, transparent pricing and easy booking experience.
        </p>
        </div>

          <div className="about-card">
          <FaEye className="icon"/>
          <h2>Our Vision</h2>
          <p>To become Kenya's most trusted platform by connecting students with quality
            housing housing in every major university town.
          </p>
          </div>
        </section>
        <section className="why-hostelHub">
          <h2>Why Choose HostelHub?</h2>
          <div className="about-features">
            <div>
              <FaCheckCircle className="icon"/>
            <h3>Verified Hostels</h3>
            <p>We provide carefully selected accomodation optons.</p>
            </div>
            <div>
              <FaUniversity className="icon"/>
              <h3>Student Focused</h3>
              <p>Built specifically to solve student accomodation challenges.</p>
            </div>
            <div>
              <FaShieldAlt className="icon"/>
              <h3>Safe and Secure</h3>
              <p>We prioritize safety and security in all our listings.</p>
            </div>
          </div>
          <FAQ/>

        </section>
    </main>
  );
}

export default About;