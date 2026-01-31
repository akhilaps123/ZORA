import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function BookTicket() {
     const { concertId } = useParams();
     const navigate = useNavigate();
     const [tickets, setTickets] = useState(1);
     const [error, setError] = useState("");
     const [success, setSuccess] = useState("");
     const [concert,setConcert] = useState(null);
     

    useEffect(() => {
        if (!concertId) return; // prevent undefined API call
        axios
        .get(`http://127.0.0.1:8000/book-ticket/${concertId}/`)
        .then((res) => {
            setConcert(res.data);
        })
        .catch(() => {
             setError("Unable to load concert details");
         });
        }, [concertId]);


     const handleBooking = async (e) => {
         e.preventDefault();
     const token = localStorage.getItem("access");
     if (!token) {
      setError("Please login first");
      return;
    }

     try {
     const response = await axios.post(
        "http://127.0.0.1:8000/book-ticket/",
        {
          concert_id: concertId,
          tickets: tickets,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

       setSuccess("Booking successful!");
       setError("");
       setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
      
    } catch (err) {
       setSuccess("");
       if (err.response) {
        setError(err.response.data.error || "Booking failed");
      } else {
        setError("Server error");
      }
    }
  };



 return (
    <div className="container mt-4">
      <h2>Book Ticket</h2>

      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      {concert ? (
      <div>
        <h4>{concert.name}</h4>
        <p>{concert.venue}</p>
        <p>{concert.date}</p>

      <form onSubmit={handleBooking}>
        <label>Number of Tickets</label>
        <input
          type="number"
          min="1"
          max="4"
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
          className="form-control mb-3"
        />

        <button className="btn btn-primary">
          Confirm Booking
        </button>
      </form>
    </div>
  ):(
      <p>Loading concert details...</p>
)}
</div>
 );
}
export default BookTicket;