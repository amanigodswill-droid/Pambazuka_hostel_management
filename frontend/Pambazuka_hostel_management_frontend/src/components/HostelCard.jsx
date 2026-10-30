import { Link } from "react-router-dom";
import "../styles/HostelCard.css";
import { toast } from "react-toastify";

function HostelCard({ hostel }) {
    function addToFavorites() {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const alreadyExists = favorites.find((item) => item.id === hostel.id);

        if (alreadyExists) {
            toast.warn("This hostel is already in your favorites.");
            return;
        }

        favorites.push(hostel);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        toast.success("Hostel added to favorites");
    }

    return (
        <div className="hostel-card">
            {hostel.cover_image && (
                <img src={hostel.cover_image} alt={hostel.name} className="hostel-image"/>
            )}

            <div className="hostel-info">
                <h3>{hostel.name}</h3>
                <p>{hostel.location}</p>
                <p><strong>Ksh {hostel.price}</strong></p>
                <Link to={`/hostels/${hostel.id}`}>View Details</Link>
                <button className="favorite-btn" onClick={addToFavorites}>Add to Favorites</button>
            </div>
        </div>
    );
}

export default HostelCard;
