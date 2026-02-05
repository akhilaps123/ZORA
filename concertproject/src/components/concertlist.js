import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Concert_list() {
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://127.0.0.1:8000/concerts/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setConcerts(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching concerts:", error);
      setLoading(false);
    });
  }, [navigate]);

  return (
    <div className="container mt-5 pb-5">
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <h2 className="fw-black mb-1 text-uppercase" style={{ letterSpacing: '2px', fontSize: '2rem' }}>
            Live <span style={{ color: '#FF007A' }}>Experiences</span>
          </h2>
          <div className="bg-pink mb-2" style={{ width: '40px', height: '3px', backgroundColor: '#FF007A' }}></div>
          <p className="text-muted small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
            Handpicked concerts for the ZORA community
          </p>
        </div>
        {/* <button className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold">
          FILTERS
        </button> */}
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : concerts.length === 0 ? (
        <div className="text-center py-5 border rounded-4 bg-light">
          <p className="text-muted mb-0">No concerts found in the vault yet.</p>
        </div>
      ) : (
        /* GRID CONTAINER */
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {concerts.map((concert) => (
            <div className="col" key={concert.id}>
              <div className="card h-100 border-0 shadow-sm zora-card-hover" style={{ borderRadius: '20px', transition: 'transform 0.3s ease' }}>
                <div className="position-relative overflow-hidden rounded-4 shadow-sm" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={
                      concert.image
                        ? concert.image.startsWith("http")
                          ? concert.image
                          : `http://127.0.0.1:8000${concert.image}`
                        : "https://via.placeholder.com/600x800?text=ZORA+LIVE"
                    }
                    className="w-100 h-100 object-fit-cover transition-img"
                    alt={concert.name}
                    style={{ transition: 'transform 0.5s ease' }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x800?text=No+Image+Found";
                    }}
                  />
                  
                  {/* GLASSMORPHISM DATE TAG */}
                  <div className="position-absolute top-0 end-0 m-3 text-center text-white px-2 py-1 rounded-3" 
                       style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', minWidth: '50px' }}>
                    <div className="fw-bold fs-5 line-height-1">
                      {new Date(concert.date_time).toLocaleDateString(undefined, { day: 'numeric' })}
                    </div>
                    <div className="small text-uppercase" style={{ fontSize: '0.65rem' }}>
                      {new Date(concert.date_time).toLocaleDateString(undefined, { month: 'short' })}
                    </div>
                  </div>
                </div>
                
                <div className="card-body px-1 py-3">
                  <h6 className="fw-bold text-truncate mb-1" style={{ fontSize: '1.1rem' }}>{concert.name}</h6>
                  <div className="d-flex align-items-center text-muted mb-3">
                    <i className="bi bi-geo-alt me-1"></i>
                    <span className="text-truncate small fw-medium">{concert.venue}</span>
                  </div>
                  
                  <button 
                    className="btn btn-dark w-100 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ fontSize: '0.85rem', letterSpacing: '0.5px', backgroundColor: '#000' }}
                    onClick={() => navigate(`/concert/${concert.id}`)}
                  >
                    GET TICKETS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CUSTOM CSS */}
      <style>{`
        .zora-card-hover:hover {
          transform: translateY(-8px);
        }
        .zora-card-hover:hover .transition-img {
          transform: scale(1.1);
        }
        .line-height-1 { line-height: 1; }
        .object-fit-cover { object-fit: cover; }
      `}</style>
    </div>
  );
}

export default Concert_list;