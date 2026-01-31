import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Payment(){
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const handlePayment=async()=>{
        const token = localStorage.getItem("access");
        try {
       await axios.post(
        "http://127.0.0.1:8000/make-payment/",
        {
          booking_id: bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        alert("Payment successful!");
        navigate("/my-bookings");
    } catch (err) {
      alert(err.response?.data?.error || "Payment failed");
    }
  };
   return (
    <div className="container mt-5 text-center">
      <h2 className="fw-bold">Complete Payment</h2>
      <p className="text-muted">Booking ID: {bookingId}</p>

      <button className="btn btn-success btn-lg mt-3" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
    