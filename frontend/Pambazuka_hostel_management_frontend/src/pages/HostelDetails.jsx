import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HostelContext } from "../context/HostelContext";
import { hostelImages } from "../data/hostels";
import "../styles/HostelDetails.css";

function HostelDetails() {
    const { id } = useParams();
    const { hostels, loading, error } = useContext(HostelContext);
    const hostel = hostels.find((item) => item.id === Number(id));
    const [selectedImage, setSelectedImage] = useState("");

    if (loading) {
        return <main className="details-page"><h2>Loading hostel details...</h2></main>;
    }

    if (error) {
        return <main className="details-page"><h2>{error}</h2></main>;
    }

    if (!hostel) {
        return <main className="details-page"><h2>Hostel not found.</h2></main>;
    }

    const images = hostel.image || hostelImages[hostel.id] || {};

    const galleryImages = [
        { image: hostel.cover_image || images.cover, label: "Cover" },
        { image: images.exteriorWithParking, label: "Exterior and Parking" },
        { image: images.bathrooms, label: "Bathrooms" },
        { image: images.kitchenSpace, label: "Kitchen" },
        { image: images.laundryArea, label: "Laundry Area" },
    ].filter((item) => item.image);

    const coverImage = galleryImages[0]?.image || "";
    const activeImage = selectedImage || coverImage;

    return (
        <main className="details-page">
            <div className="details-heading">
                <Link to="/hostels" className="details-back-link">
                    &larr; Back to Hostels
                </Link>
                <h1>{hostel.name}</h1>
                <p>{hostel.location}</p>
            </div>

            <section className="details-gallery-section">
                {activeImage ? (
                    <img
                        src={activeImage}
                        alt={hostel.name}
                        className="details-image"
                    />
                ) : (
                    <div className="details-image no-cover">
                        No cover image available.
                    </div>
                )}

                {galleryImages.length > 1 && (
                    <div className="image-gallery">
                        {galleryImages.map((item, index) => (
                            <button
                                type="button"
                                className={`gallery-item ${
                                    activeImage === item.image ? "selected" : ""
                                }`}
                                key={index}
                                onClick={() => setSelectedImage(item.image)}
                                aria-label={`View ${item.label} image`}
                            >
                                <img src={item.image} alt={item.label} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </section>

            <section className="details-content">
                <div className="details-summary">
                    <div>
                        <span className="details-label">MONTHLY RENT</span>
                        <h2>Ksh {hostel.price}</h2>
                    </div>
                    <Link to="/booking" state={{ hostel }} className="book-btn">
                        Book This Hostel
                    </Link>
                </div>

                <h3>Hostel Information</h3>

                <div className="details-grid">
                    <div className="detail-card">
                        <span>Location</span>
                        <strong>{hostel.location}</strong>
                    </div>

                    <div className="detail-card">
                        <span>Gender</span>
                        <strong>{hostel.gender}</strong>
                    </div>

                    <div className="detail-card">
                        <span>Room Options</span>
                        <strong>
                            {hostel.rooms === "Both" || hostel.rooms === "Single and Shared"
                                ? "Single and Shared"
                                : hostel.rooms}
                        </strong>
                    </div>

                    <div className="detail-card">
                        <span>Availability</span>
                        <strong>{hostel.availability} Rooms</strong>
                    </div>

                    <div className="detail-card">
                        <span>Distance</span>
                        <strong>{hostel.distance}</strong>
                    </div>
                </div>

                <div className="details-description">
                    <h3>About This Hostel</h3>
                    <p>{hostel.description || "No description available."}</p>
                </div>

                <div className="details-amenities">
                    <h3>Amenities and Facilities</h3>
                    {hostel.amenities && hostel.amenities.length > 0 ? (
                        <ul>
                            {hostel.amenities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No amenities have been listed yet.</p>
                    )}
                </div>

                <div className="details-bottom">
                    <Link to="/hostels" className="back-btn">
                        Back to Hostels
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default HostelDetails;
