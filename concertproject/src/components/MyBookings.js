import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Standardize your API base URL if not already global
const API_BASE = "http://127.0.0.1:8000";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (!token) {
            setError("Please login to view your bookings");
            setIsLoading(false);
            return;
        }

        axios.get(`${API_BASE}/my-bookings/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            setBookings(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err.response?.data?.error || "Unable to fetch bookings");
            setIsLoading(false);
        });
    }, []);

    // Loader for professional UX
    if (isLoading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="alert alert-custom bg-white shadow-sm border-start border-danger border-4 py-4">
                        <h4 className="text-danger fw-bold">Authentication Required</h4>
                        <p className="text-muted">{error}</p>
                        <button className="btn btn-dark mt-2 px-4 rounded-pill" onClick={() => navigate("/login")}>
                            Login to Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container py-5" style={{ minHeight: '80vh' }}>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-end mb-5">
                <div>
                    <h2 className="fw-bold mb-0">My Bookings</h2>
                    <p className="text-muted mb-0 small">Manage your upcoming and past event tickets</p>
                </div>
                <div className="text-end">
                    <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                        {bookings.filter(b => b.status === "PAID").length} Confirmed Events
                    </span>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                    <div className="mb-4">
                        <span className="display-1 opacity-25">🎟️</span>
                    </div>
                    <h4 className="fw-bold">No Bookings Found</h4>
                    <p className="text-muted">It looks like you haven't secured your spot at any events yet.</p>
                    <button 
                        onClick={() => navigate("/concert/")} 
                        className="btn btn-lg btn-danger mt-3 px-5 rounded-pill shadow-sm" 
                        style={{backgroundColor: '#F84464', border: 'none'}}
                    >
                        Browse Latest Events
                    </button>
                </div>
            ) : (
                <div className="row g-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="col-12 col-xl-6">
                            <div className="card h-100 border-0 shadow-sm overflow-hidden ticket-card transition-hover">
                                <div className="row g-0">
                                    {/* Left Side: Event Details */}
                                    <div className="col-sm-8 p-4">
                                        <div className="d-flex flex-column h-100">
                                            <div className="mb-2">
                                                <span className="badge bg-danger-subtle text-danger mb-2 small text-uppercase ls-wide">Concert</span>
                                                <h5 className="fw-bold text-dark mb-1 lh-base">
                                                    {booking.concert.name}
                                                </h5>
                                                <p className="text-muted small d-flex align-items-center mb-0">
                                                    <span className="me-2">📍</span> {booking.concert.venue}
                                                </p>
                                            </div>
                                            
                                            <div className="mt-auto pt-4 border-top">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <p className="mb-0 text-muted small text-uppercase tracking-wider">Date & Time</p>
                                                        <p className="mb-0 fw-bold small text-dark">
                                                            {new Date(booking.concert.date_time).toLocaleDateString('en-IN', {
                                                                weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="text-end">
                                                        <p className="mb-0 text-muted small text-uppercase tracking-wider">Total Amount</p>
                                                        <p className="mb-0 fw-bold fs-5" style={{color: '#F84464'}}>
                                                            ₹{booking.total_price} 
                                                            <span className="text-muted fw-normal fs-6"> × {booking.tickets}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Status & QR Stub */}
                                    <div 
                                        className="col-sm-4 p-4 d-flex flex-column align-items-center justify-content-center bg-light border-start border-2 border-dashed position-relative"
                                        style={{ minHeight: '160px' }}
                                    >
                                        {/* Ticket Cut-out effects (Visual Decoration) */}
                                        <div className="ticket-cutout-top"></div>
                                        <div className="ticket-cutout-bottom"></div>

                                        <div className="text-center w-100">
                                            <label className="d-block x-small text-muted text-uppercase mb-2 fw-bold ls-1">Booking Status</label>
                                            <span className={`badge rounded-pill px-3 py-2 w-100 ${
                                                booking.status === "PAID" 
                                                ? "bg-success text-white" 
                                                : "bg-warning text-dark"
                                            }`}>
                                                {booking.status === "PAID" ? "● Confirmed" : "● Action Required"}
                                            </span>
                                            
                                            {booking.status === "PAID" ? (
                                                <button 
                                                    className="btn btn-sm btn-dark mt-4 w-100 rounded-pill py-2 fw-semibold"
                                                    onClick={() => { window.open(`${API_BASE}/booking-qr/${booking.id}/`, "_blank"); }}
                                                >
                                                    Get Digital Ticket
                                                </button>
                                            ) : (
                                                <button 
                                                    className="btn btn-sm btn-danger mt-4 w-100 rounded-pill py-2 fw-semibold"
                                                    onClick={() => navigate(`/make-payment/${booking.id}`)}
                                                >
                                                    Pay ₹{booking.total_price}
                                                </button>
                                            )}
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