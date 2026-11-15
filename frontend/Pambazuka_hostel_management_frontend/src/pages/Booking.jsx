import { useState } from "react";
import { useLocation } from "react-router-dom";
import Receipt from "../components/Receipt";
import BookingForm from "../components/BookingForm";
import "../styles/Booking.css";

function Booking() {
    const location = useLocation();
    const selectedHostel = location.state?.hostel || null;
    const [bookingData, setBookingData] = useState(null);

    return (
        <main className="booking-page">
            <section className="booking-header">
                <span className="booking-label">YOUR NEXT HOME STARTS HERE</span>
                <h1>Book Your Student Hostel</h1>
                <p>Complete the booking form below to reserve your preferred accommodation around Eldoret.</p>
            </section>

            {bookingData ? (
                <Receipt bookingData={bookingData} />
            ) : (
                <BookingForm selectedHostel={selectedHostel} onBookingComplete={setBookingData} />
            )}
        </main>
    );
}

export default Booking;
