import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bolder fs-3" to="/" style={{letterSpacing: '3px'}}>
          Z<span style={{color: '#FF007A'}}>O</span>RA
        </Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link px-3 fw-bold" to="/home">HOME</Link></li>
            <li className="nav-item"><Link className="nav-link px-3 fw-bold" to="/concert">EXPLORE</Link></li>
            <li className="nav-item"><Link className="nav-link px-3 fw-bold" to="/my-bookings"> BOOKINGS</Link></li>
          </ul>

          <div className="d-flex align-items-center">
            {token ? (
              <button onClick={handleLogout} className="btn btn-outline-dark btn-sm rounded-pill px-4">
                LOGOUT
              </button>
            ) : (
              <Link to="/login" className="btn btn-dark btn-sm rounded-pill px-4">LOGIN</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;