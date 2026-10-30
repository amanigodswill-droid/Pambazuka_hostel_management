import Hero from"../components/Hero";
import Stats from "../components/Stats";
import FeaturedHostels from "../components/FeaturedHostels";
import "../styles/Home.css";
function Home() {
  return (
    <main>
      <Hero/>
      <Stats/>
          <section className="why-us">
        <h2>Why choose Pamabazuka Hostels?</h2>
        <p>We understand the challenges students face when searching for suitable accomodation.
            Pambazuka is designed to simplify the process by providing a curated list of
            verified hostels, ensuring students can find safe and affordable options with ease.
        </p>
        <div className="features">
          <div className="feature">
            <h3>Verified Hostels</h3>
            <p>Every hostel listed is carefully verified before being published.</p>
          </div>
          <div className="feature">
            <h3>Affordable prices</h3>
            <p>Compare different hostels and choose one that fits your budget.</p>
          </div>
           <div className="feature">
            <h3>Convenient Locations</h3>
            <p>Find accomodation near universities and colleges around Eldoret</p>
           </div>

        </div>
    </section>
    <FeaturedHostels />
    </main>
  );
}

export default Home;