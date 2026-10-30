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
        return <h2>Loading hostel details...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!hostel) {
        return <h2>Hostel not found.</h2>;
    }

    const images = hostelImages[hostel.id] || {};
    const coverImage = hostel.cover_image || images.cover || "";
    const galleryImages = [
        { image: coverImage, label: "Cover" },
        { image: images.exteriorWithParking, label: "Exterior" },
        { image: images.bathrooms, label: "Bathroom" },
        { image: images.kitchenSpace, label: "Kitchen" },
        { image: images.laundryArea, label: "Laundry" },
    ].filter((item) => item.image);

    return (
        <main className="details-page">
            {coverImage ? (
                <img src={selectedImage || coverImage} alt={hostel.name} className="details-image"/>
            ) : (
                <div className="details-image">No cover image available.</div>
            )}

            <div className="image-gallery">
                {galleryImages.map((item, index) => (
                    <div className="gallery-item" key={index} onClick={() => setSelectedImage(item.image)}>
                        <img src={item.image} alt={item.label} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="details-content">
                <h1>{hostel.name}</h1>

                <div className="details-grid">
                    <div className="detail-card">
                        <h4>Location</h4>
                        <p>{hostel.location}</p>

                        <h4>Monthly Rent</h4>
                        <p>Ksh {hostel.price}</p>

                        <h4>Gender</h4>
                        <p>{hostel.gender}</p>

                        <h4>Rooms</h4>
                        <p>
                            {hostel.rooms === "Both"
                                ? "Single and Shared"
                                : hostel.rooms}
                        </p>

                        <h4>Availability</h4>
                        <p>{hostel.availability} Rooms Available</p>

                        <h4>Distance</h4>
                        <p>{hostel.distance}</p>
                    </div>
                </div>

                <h3>Description</h3>
                <p>{hostel.description}</p>

                <h3>Amenities</h3>
                <ul>
                    {hostel.amenities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <div className="button-group">
                    <Link to="/booking" state={{ hostel }} className="book-btn">Book Now</Link>
                    <Link to="/hostels" className="back-btn">Back to Hostels</Link>
                </div>
            </div>
        </main>
    );
}

export default HostelDetails;
