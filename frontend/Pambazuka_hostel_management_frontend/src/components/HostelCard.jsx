import { Link, useNavigate } from "react-router-dom";
import "../styles/HostelCard.css";
import { toast } from "react-toastify";
import { hostelImages } from "../data/hostels";

function HostelCard({ hostel }) {
    const navigate = useNavigate();

    function addToFavorites() {
        const isLoggedIn =
            localStorage.getItem("isLoggedIn") === "true" &&
            !!localStorage.getItem("authToken");

        if (!isLoggedIn) {
            toast.info("Please log in to add hostels to your favorites.");
            navigate("/login");
            return;
        }

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const alreadyExists = favorites.find((item) => item.id === hostel.id);

        if (alreadyExists) {
            toast.warn("This hostel is already in your favorites.");
            return;
        }

        favorites.push(hostel);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        toast.success("Hostel added to favorites.");
    }

    const hostelImage = hostel.cover_image ||hostel.image?.cover || hostelImages[hostel.id]?.cover;

    return (
        <div className="hostel-card">
            {hostelImage && (
                <img src={hostelImage} alt={hostel.name} className="hostel-image" />
            )}

            <div className="hostel-info">
                <h3>{hostel.name}</h3>
                <p>{hostel.location}</p>
                <p><strong>Ksh {hostel.price}</strong></p>

                <Link to={`/hostels/${hostel.id}`}>View Details</Link>

                <button className="favorite-btn" onClick={addToFavorites}>
                    Add to Favorites
                </button>
            </div>
        </div>
    );
}

export default HostelCard;
