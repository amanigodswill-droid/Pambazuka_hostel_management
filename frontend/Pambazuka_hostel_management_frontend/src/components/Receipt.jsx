import "../styles/Receipt.css";

function Receipt({ bookingData }) {


  return (
  <div className="receipt">
  <div className="receipt-header">
      <h1>Pambazuka Hostel Management</h1>
        <p>Student Accommodation Booking System</p>
       <h2>OFFICIAL BOOKING RECEIPT</h2>
 </div>

      <hr />

      <div className="receipt-info">
        <p><strong>Receipt Number:</strong> {bookingData.receiptNumber}</p>
        <p><strong>Booking Date:</strong>{" "}{bookingData.bookingDate}</p>
        <p><strong>Payment Status:</strong> PAID</p>
        <p><strong>Amount Paid:</strong>Ksh {bookingData.amountPaid}</p>
    </div>

      <hr />

      <section className="receipt-section">
        <h3>Student Information</h3>
        <p><strong>Full Name:</strong> {bookingData.fullName}</p>
        <p><strong>Email:</strong> {bookingData.email}</p>
        <p><strong>Phone Number:</strong> {bookingData.phone}</p>
        <p><strong>National ID:</strong> {bookingData.nationalId}</p>
        <p><strong>Gender:</strong> {bookingData.gender}</p>
        <p><strong>University:</strong> {bookingData.university}</p>
        <p><strong>Registration Number:</strong> {bookingData.registrationNumber}</p>

    </section>

      <hr />

      <section className="receipt-section">
        <h3>Booking Information</h3>
        <p><strong>Hostel:</strong> {bookingData.hostel}</p>
        <p><strong>Room Type:</strong> {bookingData.roomType}</p>
        <p><strong>Move-in Date:</strong> {bookingData.moveInDate}</p>
        <p><strong>Special Requests:</strong> {bookingData.specialRequests || "None"}</p>

    </section>

      <hr />

      <section className="receipt-section">
        <h3>Payment Information</h3>
        <p><strong>Payment Method:</strong> {bookingData.paymentMethod}</p>
        {bookingData.paymentMethod === "M-Pesa" && (
          <p><strong>Transaction Code:</strong> {bookingData.mpesaCode}</p>
        )}
        {bookingData.paymentMethod === "Bank" && (
            <p><strong>Bank Reference:</strong> {bookingData.bankReference}</p>
        )}

    </section>

      <hr />

      <div className="receipt-footer">
        <p>Thank you for choosing Pambazuka.</p>
        <p>This receipt confirms your hostel booking and payment.</p>
        <p>For enquiries, contact Pambazuka Support.</p>
        <p>Email:hostelhub@gmail.com</p>
        <p>Phone:+254702260426</p>
        <p>Please keep this receipt for future reference</p>
         <p><strong>Reference:</strong>{bookingData.receiptNumber}</p>

        <button
          className="download-btn"
          onClick={() => window.print()}>
          Print / Download Receipt
        </button>

      </div>

    </div>

  );
}

export default Receipt;