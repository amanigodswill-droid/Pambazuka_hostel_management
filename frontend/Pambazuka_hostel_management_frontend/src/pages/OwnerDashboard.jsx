import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_BASE_URL from "../api";
import "../styles/OwnerDashboard.css";

function OwnerDashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const token = localStorage.getItem("authToken");

    const getBookings = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/hostels/owner/bookings/`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Unable to load booking requests.");
                return;
            }

            setBookings(data);

        } catch {
            toast.error("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    async function updateBooking(bookingId, newStatus) {
        setUpdatingId(bookingId);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/hostels/bookings/${bookingId}/manage/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Unable to update booking.");
                return;
            }

            toast.success(data.message);
            await getBookings();

        } catch {
            toast.error("Unable to connect to the server.");
        } finally {
            setUpdatingId(null);
        }
    }

    useEffect(() => {
        getBookings();
    }, [getBookings]);

    const pendingBookings = bookings.filter(
        (booking) => booking.status === "Pending"
    ).length;

    const approvedBookings = bookings.filter(
        (booking) => booking.status === "Approved"
    ).length;

    const rejectedBookings = bookings.filter(
        (booking) => booking.status === "Rejected"
    ).length;

    if (loading) {
        return (
            <main className="owner-dashboard">
                <div className="dashboard-loading">
                    Loading your dashboard...
                </div>
            </main>
        );
    }

    return (
        <main className="owner-dashboard">

            <div className="dashboard-header">
                <div>
                    <p className="dashboard-label">HOSTEL MANAGEMENT</p>
                    <h1>Owner Dashboard</h1>
                    <p>Welcome! Manage your hostel booking requests here.</p>
                </div>
            </div>

            <section className="dashboard-stats">

                <div className="stat-card">
                    <p>Total Bookings</p>
                    <h2>{bookings.length}</h2>
                    <span>All booking requests</span>
                </div>

                <div className="stat-card pending-stat">
                    <p>Pending</p>
                    <h2>{pendingBookings}</h2>
                    <span>Awaiting your response</span>
                </div>

                <div className="stat-card approved-stat">
                    <p>Approved</p>
                    <h2>{approvedBookings}</h2>
                    <span>Confirmed bookings</span>
                </div>

                <div className="stat-card rejected-stat">
                    <p>Rejected</p>
                    <h2>{rejectedBookings}</h2>
                    <span>Rejected requests</span>
                </div>

            </section>

            <section className="booking-section">

                <div className="section-heading">
                    <div>
                        <h2>Booking Requests</h2>
                        <p>Review and manage student reservations.</p>
                    </div>

                    <span className="booking-count">
                        {bookings.length} Requests
                    </span>
                </div>

                {bookings.length === 0 ? (
                    <div className="empty-bookings">
                        <h3>No Booking Requests Yet</h3>
                        <p>
                            When students book your hostels, their requests
                            will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="booking-list">

                        {bookings.map((booking) => (
                            <article className="booking-card" key={booking.id}>

                                <div className="booking-card-header">
                                    <div>
                                        <p className="hostel-label">HOSTEL</p>
                                        <h3>{booking.hostel_name}</h3>
                                    </div>

                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="booking-details">

                                    <div>
                                        <span>Student Name</span>
                                        <strong>{booking.full_name}</strong>
                                    </div>

                                    <div>
                                        <span>Email Address</span>
                                        <strong>{booking.email}</strong>
                                    </div>

                                    <div>
                                        <span>Phone Number</span>
                                        <strong>{booking.phone}</strong>
                                    </div>

                                    <div>
                                        <span>University</span>
                                        <strong>{booking.university}</strong>
                                    </div>

                                    <div>
                                        <span>Room Type</span>
                                        <strong>{booking.room_type}</strong>
                                    </div>

                                    <div>
                                        <span>Move-in Date</span>
                                        <strong>{booking.move_in_date}</strong>
                                    </div>

                                    <div>
                                        <span>Booking Amount</span>
                                        <strong>KSh {booking.amount}</strong>
                                    </div>

                                    <div>
                                        <span>Payment Status</span>
                                        <strong>{booking.payment_status}</strong>
                                    </div>

                                </div>

                                {booking.status === "Pending" && (
                                    <div className="booking-actions">

                                        <button
                                            className="approve-btn"
                                            onClick={() => updateBooking(booking.id, "Approved")}
                                            disabled={updatingId !== null}
                                        >
                                            {updatingId === booking.id
                                                ? "Updating..."
                                                : "Approve Booking"}
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() => updateBooking(booking.id, "Rejected")}
                                            disabled={updatingId !== null}
                                        >
                                            {updatingId === booking.id
                                                ? "Updating..."
                                                : "Reject Booking"}
                                        </button>

                                    </div>
                                )}

                            </article>
                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}

export default OwnerDashboard;
