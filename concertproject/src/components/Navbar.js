import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // To highlight the active link
  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-2" 
      style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95) !important' }}
    >
      <div className="container">
        {/* BRAND LOGO */}
        <Link className="navbar-brand fw-black fs-2" to="/" style={{ letterSpacing: '4px', fontWeight: '900' }}>
          Z<span style={{ color: '#FF007A' }}>O</span>RA
        </Link>

        {/* MOBILE TOGGLE BUTTON */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 fw-bold ${isActive('/home') ? 'text-dark' : 'text-muted'}`} 
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 fw-bold ${isActive('/concert') ? 'text-dark' : 'text-muted'}`} 
                to="/concert"
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 fw-bold ${isActive('/my-bookings') ? 'text-dark' : 'text-muted'}`} 
                to="/my-bookings"
              >
                Bookings
              </Link>
            </li>
          </ul>

          {/* ACTION BUTTONS */}
          <div className="d-flex align-items-center gap-2">
            {token ? (
              <button 
                onClick={handleLogout} 
                className="btn btn-outline-danger btn-sm rounded-pill px-4 fw-bold"
                style={{ fontSize: '0.8rem', transition: 'all 0.3s' }}
              >
                LOGOUT
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-link text-dark text-decoration-none fw-bold small px-3"
                >
                  LOGIN
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-dark btn-sm rounded-pill px-4 fw-bold shadow-sm"
                  style={{ fontSize: '0.8rem' }}
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .nav-link {
          transition: color 0.3s ease;
          position: relative;
        }
        .nav-link:hover {
          color: #FF007A !important;
        }
        .navbar-brand:hover {
          opacity: 0.8;
        }
        @media (max-width: 991px) {
          .navbar-nav { padding: 1rem 0; }
          .d-flex { padding-bottom: 1rem; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;