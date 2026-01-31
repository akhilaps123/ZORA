import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Concertlist from "./components/concertlist";
import Layout from "./components/Layout";
import BookTicket from "./components/BookTicket";
import MyBookings from "./components/MyBookings";
import ConcertDetail from "./components/ConcertDetail";
import Payment from "./components/Payment";
import Home from "./components/home";
// import ProtectedRoute from "./components/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // This contains the Navbar
    children: [
      { path: "", element: <App /> }, // Home Page
      {path: "/home",element: <Home />},
      { path: "/concert", element: <Concertlist /> },
      { path: "/book-ticket/:concertId", element: <BookTicket/> },
      { path: "/my-bookings", element: <MyBookings/>},
      { path: "/concert/:id", element: <ConcertDetail/> },
      { path: "/make-payment/:bookingId",element: <Payment/>},
      // {path: "/concert",element: (<ProtectedRoute><Concertlist /></ProtectedRoute>)},
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },

]);

export default router;