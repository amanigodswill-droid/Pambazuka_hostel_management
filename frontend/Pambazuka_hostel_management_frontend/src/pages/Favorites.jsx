import { useEffect, useState } from "react";
import HostelCard from "../components/HostelCard";
import "../styles/Favorites.css";
import { toast } from "react-toastify";

function Favorites() {
  const[favorites, setFavorites] =useState([]);useEffect(() =>{
    const savedFavorites= JSON.parse(localStorage.getItem("favorites"))|| [];
    setFavorites(savedFavorites);

    if (savedFavorites.length === 0) {
      toast.info("You have no favorite hostels yet.");
    }
  },[]);
  function removeFavorite(id) {
    const updatedFavorites=favorites.filter((hostel)=>hostel.id!==id);

  setFavorites(updatedFavorites);localStorage.setItem("favorites",JSON.stringify
    (updatedFavorites)
  );
  toast.success("Hostel removed from your favorites");

  if (updatedFavorites.length === 0) {
    toast.info("You favorites list is now empty.");
  }
}

return(
  <main className="favorites-page">
    <h1>My Favorite Hostels</h1>

    {favorites.length === 0 ? (
      <p>No favorite hostels yet.</p>
    ) : (
      <div className="hostels-grid">
        {favorites.map((hostel) => (
          <div key={hostel.id} className="favorite-item">
            <HostelCard key={hostel.id} hostel={hostel} />
            <button className="remove-btn" onClick={() => removeFavorite(hostel.id)}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    )}
  </main>
);
}

export default Favorites;