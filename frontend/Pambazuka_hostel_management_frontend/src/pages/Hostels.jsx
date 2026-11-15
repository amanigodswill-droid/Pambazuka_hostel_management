import { useContext, useState } from "react";
import "../styles/Hostels.css";
import { HostelContext } from "../context/HostelContext";
import Hostellist from "../components/Hostellist";

function Hostels() {
    const { hostels } = useContext(HostelContext);
    const [search, setSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [roomFilter, setRoomFilter] = useState("All");
    const filteredHostels = hostels.filter((hostel) => {
        const matchesSearch = hostel.name.toLowerCase().includes(search.toLowerCase());
        const matchesGender =
            genderFilter === "All" || hostel.gender === genderFilter;

        const matchesRoom =
            roomFilter === "All" ||
            hostel.rooms === roomFilter ||
            hostel.rooms === "Both";

        return matchesSearch && matchesGender && matchesRoom;
    });

    const clearFilters = () => {
        setSearch("");
        setGenderFilter("All");
        setRoomFilter("All");
    };

    return (
        <main className="hostels-page">
            <div className="hostels-heading">
                <span className="hostels-label">FIND YOUR NEXT HOME</span>
                <h1>Explore Student Hostels</h1>
                <p className="hostels-intro">
                    Browse available hostels around Eldoret. Compare prices,
                    explore accommodation options and find a place that
                    suits your needs.
                </p>
            </div>

            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search hostel by name..."
                    className="search-box"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select className="filter-select" value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)}>
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Mixed">Mixed</option>
                </select>

                <select className="filter-select" value={roomFilter} onChange={(event) => setRoomFilter(event.target.value)}> 
                    <option value="All">All Rooms</option>
                    <option value="Single">Single</option>
                    <option value="Shared">Shared</option>
                    <option value="Both">Single and Shared</option>
                </select>

                <button type="button" className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
            </div>

            <div className="hostels-results">
                <p>
                    Showing <strong>{filteredHostels.length}</strong>{" "}
                    {filteredHostels.length === 1 ? "hostel" : "hostels"}
                </p>
            </div>

            {filteredHostels.length > 0 ? (
                <Hostellist hostels={filteredHostels} />
            ) : (
                <div className="no-hostels">
                    <h3>No hostels found</h3>
                    <p>Try changing your search or filter options.</p>
                    <button onClick={clearFilters}>Clear Filters</button>
                </div>
            )}
        </main>
    );
}

export default Hostels;
