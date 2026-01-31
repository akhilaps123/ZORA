import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../App.css";

function ConcertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/concerts/${id}/`) // Ensure this matches your Django URL path
      .then((res) => {
        setConcert(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading concert details", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="zora-loader">Loading Experience...</div>;
  if (!concert) return <div className="text-center mt-5">Concert not found.</div>;

  return (
    <div className="zora-detail-container">
      {/* Hero Header Section */}
      <div className="detail-hero">
        <img
  src={
    concert.image?.startsWith("http") ? concert.image : `http://127.0.0.1:8000/concerts/${concert.image}`}
    alt=""
    className="hero-blur-bg"
/>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-md-4">
                <div className="position-relative overflow-hidden rounded-4 cursor-pointer" onClick={() => navigate(`/concert/${concert.id}`)} style={{ cursor: 'pointer' }}>
              <img
  src={
    concert.image?.startsWith("http")
      ? concert.image
      : `http://127.0.0.1:8000/concerts/${concert.image}`
  }
  alt={concert.name}
  className="img-fluid rounded-4 shadow-lg main-poster"
/>
            </div>
            </div>
            <div className="col-md-8 text-white ps-md-5">
              <h1 className="display-3 fw-bolder mb-3 text-uppercase">{concert.name}</h1>
              <div className="d-flex gap-3 mb-4 flex-wrap">
                <span className="badge rounded-pill bg-light text-dark px-3 py-2">🎵 Live Concert</span>
                <span className="badge rounded-pill border border-light px-3 py-2">⭐ High Demand</span>
              </div>
              <p className="fs-5 opacity-75">{concert.description || "An immersive live music experience you don't want to miss."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <h4 className="fw-bold mb-4">About the Event</h4>
            <p className="text-secondary leading-relaxed">
                Join us for <strong>{concert.name}</strong> at the iconic <strong>{concert.venue}</strong>. 
                Experience the magic of live music under the neon lights. Prepare for an unforgettable 
                night filled with energy, rhythm, and your favorite hits.
            </p>
          </div>
          <div className="col-md-4">
            <div className="booking-sidebar-card p-4 shadow-sm border rounded-4 bg-white">
              <div className="mb-3">
                <small className="text-muted d-block">WHERE</small>
                <span className="fw-bold">{concert.venue}</span>
              </div>
              <div className="mb-4">
                <small className="text-muted d-block">WHEN</small>
                <span className="fw-bold">{new Date(concert.date_time).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</span>
              </div>
              <button 
                className="btn zora-btn-primary w-100 py-3 fw-bold"
                onClick={() => navigate(`/book-ticket/${concert.id}`)}
              >
                BOOK TICKETS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertDetail;