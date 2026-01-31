import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; 

function Concert_list() {
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    const isStaff = localStorage.getItem("is_staff");

    if (!token) {
        navigate("/login");
    return;
    }

    axios
      .get("http://127.0.0.1:8000/concerts/")
      .then((response) => {
        setConcerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching concerts:", error);
      });
  }, [navigate]);

  return (
    <div className="container mt-5">
      {/* ZORA Header Section */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bolder mb-0 text-uppercase" style={{ letterSpacing: '1px' }}>
            Live <span className="zora-text-gradient">Experiences</span>
          </h2>
          <p className="text-muted small">Handpicked concerts just for you</p>
        </div>
        <button className="btn btn-link text-decoration-none zora-pink fw-bold">
          View All 〉
        </button>
      </div>

      {concerts.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No concerts found in the vault yet.</p>
        </div>
      )}

      {/* Grid container */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {concerts.map((concert) => (
          <div className="col" key={concert.id}>
            <div className="card h-100 border-0 zora-card">
              <div className="position-relative overflow-hidden rounded-4">
                <img
  src={concert.image.startsWith('http') ? concert.image : `http://127.0.0.1:8000${concert.image}`}
  className="card-img-top zora-img"
  alt={concert.name}
  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image+Found'; }}
/>
                {/* ZORA Style Date Tag */}
                <div className="zora-date-tag">
                  <span className="fw-bold">
                    {new Date(concert.date_time).toLocaleDateString(undefined, { day: 'numeric' })}
                  </span>
                  <br />
                  <small>
                    {new Date(concert.date_time).toLocaleDateString(undefined, { month: 'short' })}
                  </small>
                </div>
              </div>
              
              <div className="card-body px-1 py-3">
                <h6 className="fw-bold text-truncate mb-1">{concert.name}</h6>
                <div className="d-flex align-items-center text-muted small mb-2">
                    <span className="text-truncate">{concert.venue}</span>
                </div>
                
                <button 
                  className="btn zora-btn-primary w-100 mt-2"
                  onClick={() => navigate(`/concert/${concert.id}`)}
                >
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Concert_list;