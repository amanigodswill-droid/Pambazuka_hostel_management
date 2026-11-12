import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_BASE_URL from "../api";
import "../styles/MyBookings.css";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(null);

    const token = localStorage.getItem("authToken");

    async function getBookings() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/hostels/bookings/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to load bookings.");
            }

            setBookings(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBookings();
    }, []);

    async function cancelBooking(bookingId) {
        if (!window.confirm("Are you sure you want to cancel this booking?")) {
            return;
        }

        setCancelling(bookingId);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/hostels/bookings/${bookingId}/cancel/`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unable to cancel booking.");
            }

            toast.success("Booking cancelled successfully.");
            getBookings();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setCancelling(null);
        }
    }

    if (loading) {
        return <div className="my-bookings"><p>Loading your bookings...</p></div>;
    }

    return (
        <main className="my-bookings">
            <section className="my-bookings-header">
                <h1>My Bookings</h1>
                <p>View and manage your hostel booking requests.</p>
            </section>

            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <h2>No Bookings Yet</h2>
                    <p>You have not made any hostel bookings.</p>
                </div>
            ) : (
                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <article className="student-booking-card" key={booking.id}>
                            <div className="student-booking-heading">
                                <h2>{booking.hostel_name}</h2>
                                <span className={`booking-status ${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="student-booking-details">
                                <p><strong>Amount:</strong> KSh {booking.amount}</p>
                                <p><strong>Room:</strong> {booking.room_type}</p>
                                <p><strong>Move-in Date:</strong> {booking.move_in_date}</p>
                                <p><strong>Date Booked:</strong> {new Date(booking.date_booked).toLocaleDateString()}</p>
                                <p><strong>Payment Method:</strong> {booking.payment_method || "Not provided"}</p>
                                <p><strong>Payment Reference:</strong> {booking.payment_reference || "Not provided"}</p>
                            </div>

                            <div className="student-payment-details">
                                <strong>Payment Status:</strong>
                                <span className={`payment-status ${booking.payment_status.toLowerCase()}`}>
                                    {booking.payment_status}
                                </span>
                            </div>

                            {booking.status === "Pending" && (
                                <button
                                    className="cancel-booking-btn"
                                    onClick={() => cancelBooking(booking.id)}
                                    disabled={cancelling === booking.id}
                                >
                                    {cancelling === booking.id ? "Cancelling..." : "Cancel Booking"}
                                </button>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default MyBookings;
