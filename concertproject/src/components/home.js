import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light">
      {/* HERO SECTION */}
      <div className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">🎶 Live Concert Booking</h1>
          <p className="lead mt-3">
            Book tickets for the best live concerts near you
          </p>
          <button
            className="btn btn-danger btn-lg mt-4"
            style={{ backgroundColor: "#F84464", border: "none" }}
            onClick={() => navigate("/concert")}
          >
            Explore Concerts
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="mb-3">🎟 Easy Booking</h3>
                <p className="text-muted">
                  Book your concert tickets in just a few clicks.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="mb-3">💳 Secure Payment</h3>
                <p className="text-muted">
                  Safe and reliable payment experience.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="mb-3">📍 Live Events</h3>
                <p className="text-muted">
                  Discover concerts happening across different venues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-white py-5 border-top">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to experience live music?</h2>
          <button
            className="btn btn-outline-dark btn-lg"
            onClick={() => navigate("/signup")}
          >
            Create an Account
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3">
        <small>© 2026 Concert Booking App | Built with React & Django</small>
      </footer>
    </div>
  );
}

export default Home;
