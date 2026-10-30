import{useState} from "react";
import { useParams, Link } from "react-router-dom";
import hostels from "../data/hostels";
import "../styles/HostelDetails.css";

function HostelDetails() {
  const { id } = useParams();

  const hostel = hostels.find((item) => item.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(
    hostel ? hostel.image.cover : ""
  );

  if (!hostel) {
    return <h2>Hostel not found.</h2>;
  }

  return (

    <main className="details-page">
      <img src={selectedImage} alt={hostel.name} className="details-image" />

<div className="image-gallery">

  <div
    className="gallery-item"
    onClick={() => setSelectedImage(hostel.image.cover)}
  >
    <img src={hostel.image.cover} alt="Cover" />
    <span>Cover</span>
  </div>

  <div
    className="gallery-item"
    onClick={() => setSelectedImage(hostel.image.exteriorWithParking)}
  >
    <img src={hostel.image.exteriorWithParking} alt="Exterior" />
    <span>Exterior</span>
  </div>

  <div
    className="gallery-item"
    onClick={() => setSelectedImage(hostel.image.bathrooms)}
  >
    <img src={hostel.image.bathrooms} alt="Bathroom" />
    <span>Bathroom</span>
  </div>

  <div
    className="gallery-item"
    onClick={() => setSelectedImage(hostel.image.kitchenSpace)}
  >
    <img src={hostel.image.kitchenSpace} alt="Kitchen" />
    <span>Kitchen</span>
  </div>

  <div
    className="gallery-item"
    onClick={() => setSelectedImage(hostel.image.laundryArea)}
  >
    <img src={hostel.image.laundryArea} alt="Laundry" />
    <span>Laundry</span>
  </div>

</div>
      <div className="details-content">
        <h1>{hostel.name}</h1>
        <div className="details-grid">
          <div className="detail-card">
            <h4>Location</h4><p>{hostel.location}</p>
            <h4>Monthly Rent</h4><p>Ksh {hostel.price}</p>
            <h4>Gender</h4><p>{hostel.gender}</p>
            <h4>Rooms</h4><p>{hostel.rooms}</p>
            <h4>Availability</h4><p>{hostel.availability} Rooms Available</p>
            <h4>Distance</h4><p>{hostel.distance}</p>
          </div>
        </div>
        <h3>Descriptions</h3>
        <p>{hostel.description}</p>
        <h3>Amenities</h3>
        <ul>
          {hostel.amenities.map((item,index) =>(
            <li key={index}>{item}</li>
          ))}
        </ul>
      <div className="button-group">
        <Link to="/booking" state={{hostel}} className="book-btn">Book Now</Link>
        <Link to="/hostels" className="back-btn">Back to Hostels</Link>
      </div>
      </div>
    </main>
  );
}

export default HostelDetails;