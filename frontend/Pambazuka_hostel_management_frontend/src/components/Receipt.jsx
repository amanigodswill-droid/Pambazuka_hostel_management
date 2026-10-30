import "../styles/Receipt.css";

function Receipt({ bookingData }) {
    const paymentStatus = bookingData.payment_status || "Pending";
    const bookingStatus = bookingData.status || "Pending";

    const receiptNumber = bookingData.id
        ? `PH-${bookingData.id}`
        : "Pending";

    const paymentMethod = bookingData.payment_method === "Mpesa"
        ? "M-Pesa"
        : bookingData.payment_method;

    return (
        <div className="receipt">
            <div className="receipt-header">
                <h1>Pambazuka Hostel Management</h1>
                <p>Student Accommodation Booking System</p>
                <h2>BOOKING RECEIPT</h2>
            </div>

            <hr />

            <div className="receipt-info">
                <p><strong>Receipt Number:</strong> {receiptNumber}</p>
                <p><strong>Booking Date:</strong> {bookingData.date_booked
                    ? new Date(bookingData.date_booked).toLocaleDateString()
                    : "Not available"}</p>
                <p><strong>Booking Status:</strong> {bookingStatus}</p>
                <p><strong>Payment Status:</strong> {paymentStatus}</p>
                <p><strong>Hostel Price:</strong> Ksh {bookingData.amount || "Notavailable"}</p>
            </div>

            <hr />

            <section className="receipt-section">
                <h3>Student Information</h3>
                <p><strong>Full Name:</strong> {bookingData.full_name}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                <p><strong>Phone Number:</strong> {bookingData.phone}</p>
                <p><strong>National ID:</strong> {bookingData.national_id}</p>
                <p><strong>Gender:</strong> {bookingData.gender}</p>
                <p><strong>University:</strong> {bookingData.university}</p>
                <p><strong>Registration Number:</strong> {bookingData.registration_number}</p>
            </section>

            <hr />

            <section className="receipt-section">
                <h3>Booking Information</h3>
                <p><strong>Hostel:</strong> {bookingData.hostel_name || bookingData.hostel}</p>
                <p><strong>Room Type:</strong> {bookingData.room_type}</p>
                <p><strong>Move-in Date:</strong> {bookingData.move_in_date}</p>
            </section>

            <hr />

            <section className="receipt-section">
                <h3>Payment Information</h3>
                <p><strong>Payment Method:</strong> {paymentMethod}</p>
                <p><strong>Payment Reference:</strong> {bookingData.payment_reference || "Not provided"}</p>
            </section>

            <hr />

            <div className="receipt-footer">
                <p>Thank you for choosing Pambazuka.</p>
                <p>This document confirms that your booking request was received.</p>
                <p>Payment is subject to verification.</p>
                <p>Email: hostelhub@gmail.com</p>
                <p>Phone: +254702260426</p>
                <p>Please keep this receipt for future reference.</p>

                <button className="download-btn" onClick={() => window.print()}>Print / Download Receipt</button>
            </div>
        </div>
    );
}

export default Receipt;
