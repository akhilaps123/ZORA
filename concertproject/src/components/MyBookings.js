import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (!token) {
            setError("Please login to view your bookings");
            return;
        }

        axios.get("http://127.0.0.1:8000/my-bookings/", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBookings(res.data))
        .catch((err) => setError(err.response?.data?.error || "Unable to fetch bookings"));
    }, []);

    if (error) return (
        <div className="container mt-5 text-center">
            <div className="alert alert-danger shadow-sm">{error}</div>
            <button className="btn btn-primary" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">🎟️ My Bookings</h2>
                <span className="badge bg-secondary text-uppercase">
  {bookings.filter(b => b.status === "PAID").length} Confirmed
</span>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-5 border rounded bg-white shadow-sm">
                    <p className="text-muted mb-0">You haven't booked any concerts yet.</p>
                    <button onClick={() => navigate("/concert/")} className="btn btn-danger mt-3" style={{backgroundColor: '#F84464', border: 'none'}}>Explore Events</button>
                </div>
            ) : (
                <div className="row g-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="col-12 col-lg-6">
                            <div className="card h-100 border-0 shadow-sm booking-card">
                                <div className="row g-0">
                                    {/* Left Side: Event Info */}
                                    <div className="col-8 p-4">
                                        <div className="d-flex flex-column h-100">
                                            <h5 className="fw-bold text-dark mb-1 text-truncate">
                                                {booking.concert.name}
                                            </h5>
                                            <p className="text-muted small mb-3">📍 {booking.concert.venue}</p>
                                            
                                            <div className="mt-auto">
                                                <p className="mb-1 fw-semibold small text-secondary">
                                                    📅 {new Date(booking.concert.date_time).toLocaleDateString('en-IN', {
                                                        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </p>
                                                <p className="mb-0 fw-bold" style={{color: '#F84464'}}>
                                                    ₹{booking.total_price} <small className="text-muted fw-normal">({booking.tickets} Tickets)</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Action/Ticket UI */}
                                    <div className="col-4 border-start border-2 border-dashed d-flex align-items-center justify-content-center bg-light rounded-end">
                                        <div className="text-center p-2">
                                            <span className="d-block small text-muted text-uppercase mb-2">Status</span>
                                            <span className={`badge rounded-pill px-3 ${booking.status === "PAID"? "bg-success-subtle text-success border border-success": "bg-warning-subtle text-warning border border-warning"}`}>
                                            {booking.status === "PAID" ? "Confirmed" : "Payment Pending"}</span>
                                            {booking.status === "PAID" ? (<button className="btn btn-sm btn-outline-dark mt-3 d-block w-100">
                                             View QR</button>) : (<button className="btn btn-sm btn-warning mt-3 d-block w-100"
                                              onClick={() => navigate(`/make-payment/${booking.id}`)}>
                                            Pay Now</button>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;