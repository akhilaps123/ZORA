// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // function AdminConcerts() {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const isStaff = localStorage.getItem("is_staff");

// //     if (isStaff !== "true") {
// //       navigate("/token");   // block non-admins
// //     }
// //   }, [navigate]);

// //   return (
// //     <div>
// //       <h2>Admin Concert List</h2>
// //       {/* Admin controls */}
// //     </div>
// //   );
// // }

// // export default AdminConcerts;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// // import "..App.css"; // same CSS you used in Django
// import "../styles/AdminDashboard.css";

// function AdminConcertDashboard() {
//   const navigate = useNavigate();
//   const [concerts, setConcerts] = useState([]);
//   useEffect(() => {
//     const isStaff = localStorage.getItem("is_staff");
//     if (isStaff !== "true") {
//      navigate("/token");   // block non-admins
//      return;
//   }
//     axios.get("http://127.0.0.1:8000/concerts/",{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//       },
//       })// change API if needed
//       .then((response) => setConcerts(response.data))
//       .catch((error) => console.error("Error fetching concerts:", error));
//   }, [navigate]);

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this concert?")) return;

//     axios.delete(`http://127.0.0.1:8000/concerts/${id}/`,{
//        headers: {
//         Authorization: `Bearer ${localStorage.getItem("access")}`,
//       },
//     })
//       .then(() => {
//         setConcerts(concerts.filter((concert) => concert.id !== id));
//       });
//       // .catch((error) => {
//       //   console.error("Error deleting concert:", error);
//       // });
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">🎵 Concert Admin</div>

//         <a href="/admin/dashboard" className="active">
//           <span className="icon">🏠</span>
//           <span className="text">Dashboard</span>
//         </a>

//         <a href="/admin/add-concert">
//           <span className="icon">➕</span>
//           <span className="text">Add Concert</span>
//         </a>
//       </div>

//       {/* Main Content */}
//       <div className="main">
//         {/* Topbar */}
//         <div className="topbar">
//           <span className="title">Concert Management</span>
//         </div>

//         {/* Content */}
//         <div className="content">
//           <div className="concert-grid">
//             {concerts.length === 0 && (
//               <p className="text-center text-muted">No concerts available</p>
//             )}

//             {concerts.map((concert) => (
//               <div className="concert-card" key={concert.id}>
//                 <div className="concert-image">
//                   {concert.image ? (
//                     <img src={concert.image} alt={concert.name} />
//                   ) : (
//                     <div className="no-image">No Image</div>
//                   )}
//                 </div>

//                 <div className="concert-info">
//                   <h5 className="concert-name">{concert.name}</h5>

//                   <p className="concert-date">
//                     {new Date(concert.date_time).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "2-digit",
//                       year: "numeric",
//                     })}{" "}
//                     •{" "}
//                     {new Date(concert.date_time).toLocaleTimeString("en-US", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>

//                   <p className="concert-venue">{concert.venue}</p>
//                   <p className="concert-price">₹ {concert.ticket_price}</p>
//                   <p className="concert-tickets">
//                     Tickets: {concert.available_tickets}
//                   </p>

//                   <div className="concert-actions">
//                     <a
//                       href={`/admin/edit-concert/${concert.id}`}
//                       className="btn btn-warning btn-sm"
//                     >
//                       Edit
//                     </a>

//                     <button
//                       className="btn btn-danger btn-sm ms-2"
//                       onClick={() => handleDelete(concert.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//   }

// export default AdminConcertDashboard;

