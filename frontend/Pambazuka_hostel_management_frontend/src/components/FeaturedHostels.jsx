import { useContext } from "react";
import HostelCard from "./HostelCard";
import { HostelContext } from "../context/HostelContext";

function FeaturedHostels() {
    const { hostels, loading, error } = useContext(HostelContext);
    const featured = hostels.slice(0, 2);

    if (loading) {
        return <p>Loading featured hostels...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="featured-hostels">
            <h2>Featured Hostels</h2>
            <p>Browse some of the most popular student hostels around Eldoret.</p>

            <div className="hostel-grid">
                {featured.map((hostel) => (
                    <HostelCard key={hostel.id} hostel={hostel}/>
                ))}
            </div>
        </section>
    );
}

export default FeaturedHostels;
