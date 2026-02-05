import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

// Configuration
const API_BASE_URL = "http://127.0.0.1:8000";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/800x450?text=No+Image+Available";

function ConcertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize date formatter to prevent re-creation on every render
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }), []);

  useEffect(() => {
    let isMounted = true;

    const fetchEventDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/concerts/${id}/`);
        if (isMounted) {
          setEventData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.status === 404 
            ? "The requested event could not be found." 
            : "We're having trouble reaching the server. Please try again.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEventDetails();
    return () => { isMounted = false; }; // Cleanup to prevent memory leaks
  }, [id]);

  const resolveImageUrl = (path) => {
    if (!path) return PLACEHOLDER_IMAGE;
    return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="container py-5 text-center">
        <div className="card border-0 shadow-sm p-5">
          <h2 className="text-muted mb-4">{error || "Event not found"}</h2>
          <button className="btn btn-primary px-4 py-2" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left me-2"></i>Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="zora-detail-wrapper bg-light min-vh-100">
      {/* Dynamic Hero Section with Overlay */}
      <header className="detail-hero position-relative overflow-hidden text-white py-5 py-lg-0">
        <div 
          className="hero-background-blur position-absolute w-100 h-100" 
          style={{ 
            backgroundImage: `url(${resolveImageUrl(eventData.image)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(20px)',
            transform: 'scale(1.1)',
            zIndex: -1
          }} 
        />
        
        <div className="container py-lg-5 position-relative">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
              <div className="poster-wrapper shadow-lg transition-hover">
                <img
                  src={resolveImageUrl(eventData.image)}
                  alt={eventData.name}
                  className="img-fluid rounded-4 shadow-lg border border-white border-opacity-10"
                />
              </div>
            </div>
            
            <div className="col-lg-8 col-md-7 ps-lg-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-3">
                  <li className="breadcrumb-item"><Link to="/" className="text-white-50 text-decoration-none">Events</Link></li>
                  <li className="breadcrumb-item active text-white" aria-current="page">{eventData.name}</li>
                </ol>
              </nav>
              
              <h1 className="display-3 fw-bold mb-3 tracking-tight">{eventData.name}</h1>
              
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge rounded-pill bg-primary px-3 py-2">LIVE PERFORMANCE</span>
                <span className="badge rounded-pill bg-dark border border-white-50 px-3 py-2">
                  <i className="bi bi-lightning-fill text-warning me-1"></i> SELLING FAST
                </span>
              </div>
              
              <p className="lead opacity-75 max-w-600">
                {eventData.description || "Experience a premium live performance curated for music enthusiasts and cultural seekers."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Details & Action Sidebar */}
      <main className="container py-5">
        <div className="row g-4 g-xl-5">
          <div className="col-lg-8">
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-0 mb-4">
              <h3 className="h4 fw-bold mb-4 d-flex align-items-center">
                <span className="bg-primary p-2 rounded-3 me-3 d-inline-flex"></span>
                Event Overview
              </h3>
              <div className="text-secondary lh-lg fs-5">
                <p>
                  Join us at <span className="text-dark fw-bold">{eventData.venue}</span> for a headline performance 
                  by <span className="text-dark fw-bold">{eventData.name}</span>. This exclusive showcase promises 
                  state-of-the-art production and an atmosphere tailored for the ultimate live experience.
                </p>
              </div>
            </div>
          </div>

          <aside className="col-lg-4">
            <div className="booking-card sticky-top shadow-lg border-0 card rounded-4 overflow-hidden" style={{ top: '2rem' }}>
              <div className="card-header bg-dark py-3">
                <h5 className="card-title text-white mb-0 text-center">Ticket Information</h5>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <label className="small text-uppercase fw-bold text-muted mb-2 d-block">Location</label>
                  <div className="d-flex align-items-start">
                    <i className="bi bi-geo-alt-fill text-primary mt-1 me-3 fs-5"></i>
                    <div>
                      <span className="fw-bold d-block">{eventData.venue}</span>
                      <small className="text-muted">Doors open 1 hour before start</small>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4 border-top pt-4">
                  <label className="small text-uppercase fw-bold text-muted mb-2 d-block">Date & Time</label>
                  <div className="d-flex align-items-start">
                    <i className="bi bi-calendar-event-fill text-primary mt-1 me-3 fs-5"></i>
                    <div>
                      <span className="fw-bold d-block">{dateFormatter.format(new Date(eventData.date_time))}</span>
                      <small className="text-muted">Local Venue Time</small>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-primary w-100 btn-lg shadow fw-bold py-3 transition-up"
                  onClick={() => navigate(`/book-ticket/${eventData.id}`)}
                >
                  RESERVE TICKETS
                </button>
                
                <div className="mt-4 pt-3 border-top text-center">
                  <div className="d-flex justify-content-center gap-3 opacity-50 mb-2">
                    <i className="bi bi-shield-check"></i>
                    <i className="bi bi-credit-card"></i>
                    <i className="bi bi-patch-check"></i>
                  </div>
                  <p className="x-small text-muted mb-0">
                    Secure checkout by <span className="fw-bold">Zora Pay</span>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default ConcertDetail;