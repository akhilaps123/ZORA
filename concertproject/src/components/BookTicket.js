import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Standardize API configuration
const API_BASE_URL = "http://127.0.0.1:8000";

function BookTicket() {
  const { concertId } = useParams();
  const navigate = useNavigate();

  // State Management
  const [concert, setConcert] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Fetch Concert Details
  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/concerts/${concertId}/`);
        setConcert(data);
      } catch (err) {
        setStatus({ type: "danger", message: "Unable to load concert details." });
      } finally {
        setLoading(false);
      }
    };

    if (concertId) fetchConcert();
  }, [concertId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");

    if (!token) {
      setStatus({ type: "danger", message: "Please login to continue." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(
        `${API_BASE_URL}/book-ticket/`,
        { concert_id: concertId, tickets },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus({ type: "success", message: "Booking confirmed! Redirecting..." });
      
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "An unexpected error occurred.";
      setStatus({ type: "danger", message: errorMsg });
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border" /></div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4">Book Your Tickets</h2>

              {status.message && (
                <div className={`alert alert-${status.type}`} role="alert">
                  {status.message}
                </div>
              )}

              {concert && (
                <>
                  <div className="mb-4">
                    <h4 className="text-primary">{concert.name}</h4>
                    <p className="text-muted mb-1"><strong>Venue:</strong> {concert.venue}</p>
                    <p className="text-muted"><strong>Date:</strong> {new Date(concert.date).toLocaleDateString()}</p>
                  </div>

                  <form onSubmit={handleBooking}>
                    <div className="form-group mb-3">
                      <label className="form-label font-weight-bold">Number of Tickets</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={tickets}
                        onChange={(e) => setTickets(parseInt(e.target.value))}
                        className="form-control form-control-lg"
                        required
                      />
                      <small className="form-text text-muted">Maximum 3 tickets per booking.</small>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100" 
                      disabled={submitting}
                    >
                      {submitting ? "Processing..." : "Confirm Booking"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTicket;