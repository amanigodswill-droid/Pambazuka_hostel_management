import HostelCard from "./HostelCard";
function Hostellist ({hostels}) {
    return (
        <div className="hostels-grid">
            {hostels.map((hostel) => (
                <HostelCard key ={hostel.id} hostel={hostel}/>
            ))}
        </div>
    );
}

export default Hostellist;