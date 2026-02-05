import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Custom styles for a more polished look
  const heroStyle = {
    background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1459749411177-042180ce673c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "120px 0",
  };

  const primaryBtn = {
    backgroundColor: "#F84464",
    border: "none",
    padding: "14px 40px", // Slightly increased padding for prominence
    fontWeight: "600",
    transition: "transform 0.2s ease",
    borderRadius: "50px" // More modern rounded look
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* HERO SECTION */}
      <header style={heroStyle} className="text-white text-center">
        <div className="container">
          <span className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: "rgba(248, 68, 100, 0.2)", color: "#F84464", border: "1px solid #F84464" }}>
            Now Streaming Live
          </span>
          <h1 className="display-3 fw-bold mb-3">Experience Music Like <br/> Never Before</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "700px", opacity: "0.9" }}>
            Join thousands of fans. Book exclusive tickets for the world's most anticipated live concerts and music festivals.
          </p>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger btn-lg shadow-lg"
              style={primaryBtn}
              onClick={() => navigate("/concert")}
            >
              Browse Events
            </button>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="container py-5 my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Our Platform?</h2>
          <div className="mx-auto bg-danger" style={{ width: "60px", height: "4px", borderRadius: "2px" }}></div>
        </div>

        <div className="row g-4">
          {[
            { 
              title: "Easy Booking", 
              desc: "A seamless, three-step checkout process designed for speed.", 
              icon: "bi-ticket-perforated" 
            },
            { 
              title: "Secure Payments", 
              desc: "Encrypted transactions with support for all major credit cards and UPI.", 
              icon: "bi-shield-check" 
            },
            { 
              title: "Verified Venues", 
              desc: "We partner directly with organizers to ensure 100% authentic tickets.", 
              icon: "bi-geo-alt" 
            },
          ].map((feature, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 border-0 shadow-sm p-3 text-center transition-up">
                <div className="card-body">
                  <div className="d-inline-flex align-items-center justify-content-center bg-light text-danger rounded-circle mb-4" style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}>
                    {idx === 0 ? "🎟️" : idx === 1 ? "🛡️" : "📍"}
                  </div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p className="text-muted lh-base">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="bg-dark rounded-4 p-5 text-center text-white shadow-lg">
            <h2 className="display-6 fw-bold mb-3">Ready to find your next beat?</h2>
            <p className="mb-4 text-white-50">Create an account today and get early access to pre-sale tickets.</p>
            <button
              className="btn btn-light btn-lg px-5 fw-bold rounded-pill"
              onClick={() => navigate("/signup")}
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-top py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h5 className="fw-bold mb-0">Concert<span className="text-danger">Booking</span></h5>
              <p className="text-muted small">© 2026 Premium Ticketing Experience.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <small className="text-muted">Built with React & Django</small>
            </div>
          </div>
        </div>
      </footer>

      {/* Internal CSS for the "hover" effect */}
      <style>{`
        .transition-up {
          transition: all 0.3s ease;
        }
        .transition-up:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important;
        }
      `}</style>
    </div>
  );
}

export default Home;