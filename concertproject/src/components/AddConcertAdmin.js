// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// function AddConcert() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     date_time: "",
//     venue: "",
//     ticket_price: "",
//     available_tickets: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("date_time", formData.date_time);
//     data.append("venue", formData.venue);
//     data.append("ticket_price", formData.ticket_price);
//     data.append("available_tickets", formData.available_tickets);
//     data.append("image", formData.image);

//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/concerts/create/",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       navigate("/admin/concerts"); // redirect after success
//     } catch (error) {
//       console.error("Error adding concert", error);
//       alert("Failed to add concert");
//     }
//   };

//   return (
//     <div className="main container mt-5">
//       <div className="topbar mb-3">
//         <h3>Add New Concert</h3>
//       </div>

//       <div className="content">
//         <div className="card p-4 shadow">
//           <h4 className="mb-3">Concert Details</h4>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Concert Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Date & Time</label>
//               <input
//                 type="datetime-local"
//                 name="date_time"
//                 className="form-control"
//                 value={formData.date_time}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Venue</label>
//               <input
//                 type="text"
//                 name="venue"
//                 className="form-control"
//                 value={formData.venue}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Ticket Price</label>
//               <input
//                 type="number"
//                 name="ticket_price"
//                 className="form-control"
//                 value={formData.ticket_price}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Available Tickets</label>
//               <input
//                 type="number"
//                 name="available_tickets"
//                 className="form-control"
//                 value={formData.available_tickets}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Concert Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 className="form-control"
//                 onChange={handleChange}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary me-2">
//               Add Concert
//             </button>
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={() => navigate("/admin/concerts")}
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddConcert;
