import HostelCard from "./HostelCard";
import hostels from "../data/hostels";

function FeaturedHostels() {
    const featured=hostels.slice(0,2);

    return (
        <section className="featured-hostels">
            <h2>Featured Hostels</h2>
            <p>
                Browse some of the most popular student hostels around Eldoret.
            </p>
            <div className="hostel-grid">
                {featured.map((hostel) =>(<HostelCard key={hostel.id}
                hostel={hostel} />
                ))}
            </div>
        </section>
    );
}
export default FeaturedHostels;