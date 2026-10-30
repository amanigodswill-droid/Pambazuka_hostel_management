import { useContext, useState } from "react";
import "../styles/Hostels.css";
import { HostelContext } from "../context/HostelContext";
import Hostellist from "../components/Hostellist";

function Hostels() {
  const { hostels } = useContext(HostelContext);
  const [search, setSearch] =useState("");
  const [genderFilter,setGenderFilter] =useState("All");
  const [roomFilter,setRoomFilter] = useState("All");
  const filteredHostels =hostels.filter((hostel) => {
  const matchesSearch=hostel.name.toLowerCase().includes(search.toLowerCase());
  const matchesGender=genderFilter ==="All" ||hostel.gender ===genderFilter;
  const matchesRoom=roomFilter ==="All" || hostel.rooms.includes(roomFilter);

  return matchesSearch && matchesGender && matchesRoom;}
);
  return (
    <main className="hostels-page">
      <h1>Available Student Hostels</h1>
      <p className="hostels-intro">Browse through our collection of verified hostels located
         near major universities in Eldoret.Use search and filter
         options to find accomadation that matches your preferences.</p>

         <div className="search-filter-container">
          <input type="text" placeholder="Search hostel by name..."className="search-box"
          value={search}onChange={(event) =>setSearch(event.target.value)}/>

          <select className="filter-select" value={genderFilter}
          onChange={(e) =>setGenderFilter(e.target.value)}>
              <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select className="filter-select" value={roomFilter}
          onChange={(e) =>setRoomFilter(e.target.value)}>
              <option value="All">All Rooms</option>
            <option value="Single">Single</option>
            <option value="Shared">Shared</option>
            <option value="Single and Shared">Single and Shared</option>
          </select>


         </div>
         <Hostellist hostels={filteredHostels} />
    </main>
  );
}

export default Hostels;